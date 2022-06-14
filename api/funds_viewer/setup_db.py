import os

# DATABASE_URI = os.environ.get('DATABASE_URI', 'postgresql://inf723-tp:inf723-tp@localhost:5432/inf723-tp')
DATABASE_URI = "postgresql://postgres:admin@localhost:5432/postgres"

import re
import bs4
import json
import pickle
import requests
import datetime
import dateutil

from datetime import date
from bs4 import BeautifulSoup
from xgboost import XGBRegressor
from pmdarima import auto_arima
from statsmodels.tsa.arima.model import ARIMA
from dateutil.relativedelta import relativedelta
from statsmodels.tsa.statespace.sarimax import SARIMAX

import numpy as np
import pandas as pd
import yfinance as yf

from funds_viewer.database import engine, init_db
from sqlalchemy import text
print('Initing the database')
init_db()

FUNDS_HISTORY_COLUMN_MAP = {
    'Datetime': 'date',
    'Close': 'close_price',
    'Dividends': 'dividend',
    'DividendYield': 'dividend_yield',
    'Ticker': 'code',
    'Prediction': 'prediction'
}

FUNDS_METRICS_COLUMN_MAP = {
    'Códigodo fundo': 'code',
    'Setor': 'sector',
    'Preço Atual': 'current_price',
    'Liquidez Diária': 'daily_liquidity',
    'Dividendo': 'dividend',
    'DividendYield': 'dividend_yield',
    'DY (3M)Acumulado': 'dy_3m_accumulated',
    'DY (6M)Acumulado': 'dy_6m_accumulated',
    'DY (12M)Acumulado': 'dy_12m_accumulated',
    'DY (3M)Média': 'dy_3m_average',
    'DY (6M)Média': 'dy_6m_average',
    'DY (12M)Média': 'dy_12m_average',
    'DY Ano': 'dy_year',
    'Variação Preço': 'price_variation',
    'Rentab.Período': 'income_period',
    'Rentab.Acumulada': 'income_accumulated',
    'PatrimônioLíq.': 'net_worth',
    'VPA': 'vpa',
    'P/VPA': 'p_vpa',
    'DYPatrimonial': 'equity_dy',
    'VariaçãoPatrimonial': 'equity_variation',
    'Rentab. Patr.no Período': 'equity_return_period',
    'Rentab. Patr.Acumulada': 'equity_return_accumulated',
    'VacânciaFísica': 'physical_vacancy',
    'VacânciaFinanceira': 'financial_vacancy',
    'QuantidadeAtivos': 'assets_quality'
}

FUNDS_ACTIVES_COLUMN_MAP = {
    'Código': 'code',
    'Endereço': 'address',
    'Bairro': 'neighborhood',
    'Cidade': 'city',
    'Área Bruta Locável': 'area',
    'UF': 'uf',
}



def updateColumn(columnName, line, newRow):
    if '<b>'+columnName+':</b>' in line:
        item = line.replace('<b>'+columnName+':</b>',"").replace("<li>","")
        item = item.replace("</li>","").replace("m<sup>2</sup>","")
        item = item.replace("N/A","").strip()
        newRow[columnName] = item

def converteData(datas, monthYearOnly):

    if monthYearOnly:
        return (datas.split('-')[1] + "/" + datas.split('-')[0])
    else:
        newArray = []
        meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

        for data in datas:

            item = data.split("/")
            mes = str(meses.index(item[0])+1)
            mes = ("0" + mes)[len(mes)-1:len(mes)+1]

            newArray.append(item[1] + "-" + mes + "-01 00:00:00")

        return newArray

def xgboostPrediction(dataframe, column, month):

    new_df = dataframe.copy()

    predict_column = column + "_target"

    new_df[predict_column] = new_df[column].shift(-month)

    treino = new_df[:-1]
    validacao = new_df[-1:]

    if month > 1:
        treino = new_df[:-month]
        validacao = new_df[-month:-(month-1)]

    x_treino = treino.loc[:, [column]].values
    y_treino = treino.loc[:, [predict_column]].values

    modelo_xgb = XGBRegressor(objective="reg:squarederror", n_estimators=1000)
    modelo_xgb.fit(x_treino, y_treino)

    value = float(validacao[column][-1])
    predicao = modelo_xgb.predict(value)

    return (predicao[0])

def sarimaxPrediction(dataframe, columns, months):

    result_df = None

    for col in columns:
        arima_df_aux = dataframe[[col]]
        fit_arima = auto_arima(arima_df_aux, d=1, start_p=1, start_q=1, max_p=3, mar_q=3, seasonal=True, m=6, D=1, start_P=1,start_Q=1, max_P=2, max_Q=2, information_criterion='aic', trace=False, error_action='ignore', stepwise=True)

        model=SARIMAX(arima_df_aux, order=fit_arima.order, seasonal_order=fit_arima.seasonal_order)
        resultado_sarimax = model.fit()

        forecast = resultado_sarimax.get_forecast(steps=months)

        if result_df is None:
            result_df = pd.DataFrame.from_dict(forecast.predicted_mean)

        result_df[col] = forecast.predicted_mean

    return (result_df[columns])

def traditionalPredict(dfs, ativo, columns, months):

    dataframe = dfs[ativo]

    result_df = sarimaxPrediction(dataframe, columns, months)

    result_df['DividendYield'] = float(result_df['Dividends']/result_df['Close'])*100

    result_df['Ticker'] = ativo
    result['Prediction'] = True

    return result_df

def machineLearningPredict(dfs, ativo, columns, months_to_predict):

    xgboost_df = None

    dataframe = dfs[ativo]

    for m in range(len(months_to_predict)):

        predict_months = m+1

        result = {}

        for col in columns:
            result[col] = xgboostPrediction(dataframe,col, predict_months)

        result['DividendYield'] = float(result['Dividends']/result['Close'])*100

        result['Ticker'] = ativo
        result['Date'] = months_to_predict[m]
        result['Prediction'] = True

        result_df = pd.DataFrame.from_dict([result])

        result_df = result_df.set_index('Date')
        result_df.index = pd.to_datetime(result_df.index)

        if xgboost_df is None:
            xgboost_df = result_df.copy()
        else:
            xgboost_df = pd.concat([xgboost_df, result_df])

    return xgboost_df

def run_crawling():
    first_day = pd.to_datetime('today').replace(day=1,hour=0,minute=0,second=0,microsecond=0)
    this_month = (first_day).strftime("%Y-%m")
    last_month = (first_day - relativedelta(months=1)).strftime("%Y-%m")
    headers = {
        'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36'
            ' (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    }
    url = 'https://www.fundsexplorer.com.br/ranking'

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        df = pd.read_html(response.content, encoding='utf-8')[0]

    df.sort_values('Códigodo fundo', inplace=True)

    col_categorical = ['Códigodo fundo','Setor']

    idx = df[df['Setor'].isna()].index
    df.drop(idx, inplace=True)

    df[col_categorical] = df[col_categorical].astype('category')

    col_floats = list(df.iloc[:,2:-1].columns)

    df[col_floats] = df[col_floats].fillna(value=0)

    df[col_floats] = df[col_floats].applymap(lambda x: str(x).replace('R$', '').replace('.0','').replace('.','').replace('%','').replace(',','.'))

    df[col_floats] = df[col_floats].astype('float')

    idx = df[np.isinf(df[col_floats]).any(1)].index
    df.drop(idx, inplace=True)

    df['P/VPA'] = df['P/VPA']/100

    indicadores = [
        'Códigodo fundo',
        'Setor',
        'DY (12M)Acumulado',
        'VacânciaFísica',
        'VacânciaFinanceira',
        'P/VPA',
        'QuantidadeAtivos',
        'Liquidez Diária'
    ]

    df_aux = df[indicadores]

    media_setor = df_aux.groupby('Setor').agg(['mean','std'])

    media_setor.loc['Residencial', ('DY (12M)Acumulado', 'mean')]

    dfs = {}
    newColumn = []
    predict_months = 2
    remover_fundos = []

    for t in df['Códigodo fundo']:

        ticker = yf.Ticker(t + '.SA')
        aux = ticker.history(interval='1mo',period="max")

        dados_recentes = False
        for data in aux.index:
            if last_month in str(data) or this_month in str(data):
                dados_recentes = True

        if dados_recentes == False:
            print("FII " + t + " será removido por não conter dados recentes.")
            remover_fundos.append(t)
        elif aux.empty or len(aux.index) < 20:
            print("FII " + t + " será removido por pouca quantidade de dados (" + str(len(aux.index)) + ")")
            remover_fundos.append(t)
        else:
            print('Lendo FII {}...'.format(t))
            aux.reset_index(inplace=True)
            aux['Ticker'] = t

            new_dates = []
            add_month = dateutil.relativedelta.relativedelta(months=1)

            for index, row in aux.iterrows():

                newDate = datetime.datetime(row['Date'].year, row['Date'].month, 1)

                if(row['Date'].day > 15):
                    newDate = newDate + add_month
                new_dates.append(newDate)

            aux['new_dates'] = new_dates
            aux['Prediction'] = False

            dfs[t] = aux
            dfs[t] = dfs[t].shift(-1)
            dfs[t].dropna(inplace=True)
            dfs[t] = dfs[t].reset_index(drop=True)
            dfs[t] = dfs[t][dfs[t]['new_dates'] < first_day]
            dfs[t] = dfs[t].set_index('new_dates')

            try:
                dfs[t].index.freq = 'MS'
            except:
                dfs[t].index.freq = None
                remover_fundos.append(t)
                del dfs[t]
                print("FII " + t + " será removido por estar com dados faltantes.")

    df = df[~df.isin(remover_fundos).any(axis=1)]

    columns = {'Código': [],'Endereço': [], 'Bairro': [], 'Cidade': [], 'Área Bruta Locável': []}
    df_ativos = pd.DataFrame(columns)

    for fundo in dfs:

        url = 'https://www.fundsexplorer.com.br/funds/' + fundo
        response = requests.get(url, headers=headers)

        soup = bs4.BeautifulSoup(response.content, "html")
        div = soup.find("div", {"id": "dividends-chart-wrapper"})

        labels = re.findall('"labels":\[.*?\]', str(div))
        dividends = re.findall('"data":\[.*?\]', str(div))

        # parse data:
        dividends = json.loads("{" + dividends[0] + "}")['data']
        labels = json.loads("{" + labels[0] + "}")['labels']

        # converte "Março/2021" para "2021-03-01"
        datas = converteData(labels, False)

        for i in range(len(datas)):
            dfs[fundo].loc[dfs[fundo].index[dfs[fundo].index == datas[i]],'Dividends'] = dividends[i]

        if ('Ativos do ') in str(response.content):

            print("Coletando ativos de " + fundo + "...")

            soup = BeautifulSoup(response.content,"lxml")
            w3schollsList = soup.find("div",id="fund-actives-items")

            lista = w3schollsList.find_all('ul')

            for l in lista:

                newRow = {}

                itemList = l.find_all('li')
                for it in itemList:
                    line = str(it)

                    for column in ['Endereço', 'Bairro', 'Cidade', 'Área Bruta Locável']:
                        updateColumn(column, line, newRow)

                if len(newRow) > 0:
                    newRow['Código'] = fundo
                    df_ativos = df_ativos.append(newRow, ignore_index = True)
        else:
            print(fundo + " não possui ativos.")

    columns_str = ['Código','Endereço', 'Bairro', 'Cidade']
    df_ativos[columns_str] = df_ativos[columns_str].astype("string")
    df_ativos['UF'] = df_ativos['Cidade'].str[-2:]
    df_ativos['Área Bruta Locável'] = pd.to_numeric(df_ativos['Área Bruta Locável'].str.replace(r"\.", "").str.replace(r"\,", "."), errors='coerce').astype(float)


    # Calculando datas de interesse
    months_to_predict = []
    qnt_months_to_predict = 2

    for i in range(qnt_months_to_predict):
        add_month = dateutil.relativedelta.relativedelta(months=i)
        months_to_predict.append((first_day + add_month).strftime("%Y-%m-%d"))

    xgboost_dfs = None
    for t in df['Códigodo fundo']:
        print("Predicting with Machine Learning: " + t + "...")
        aux_df = machineLearningPredict(dfs,t,['Close','Dividends'],months_to_predict)

        if xgboost_dfs is None:
            xgboost_dfs = aux_df.copy()
        else:
            xgboost_dfs = pd.concat([xgboost_dfs, aux_df])

    df_history = None
    xgboost_dfs['Datetime'] = xgboost_dfs.index

    for t in df['Códigodo fundo']:

        dfs[t]['Datetime'] = dfs[t].index
        dfs[t]['DividendYield'] = float(dfs[t]['Dividends'][0]/dfs[t]['Close'][0]) * 100

        df_aux = dfs[t][['Datetime','Close','Dividends','DividendYield','Ticker','Prediction']]

        if df_history is None:
            df_history = df_aux.copy()
        else:
            df_history = df_history.append(df_aux, ignore_index = False)

        df_history = df_history.append(xgboost_dfs[(xgboost_dfs['Ticker'] == t)].copy(), ignore_index = False)

    return {'df': df, 'df_ativos': df_ativos, 'df_history': df_history}

# DE FATO INSERINDO
def run_insertion():
    print('Checking if the database needs seeding')
    with engine.connect() as connection:
        result = connection.execute(text("SELECT COUNT(*) FROM funds;"))
        for r in result:
            if (r and r[0] and r[0] > 50): return True

    print('Crawling...')
    crawling_results = run_crawling()

    print('Inserting the actives data...')
    funds_df = crawling_results['df_ativos'].rename(columns=FUNDS_ACTIVES_COLUMN_MAP)
    print(funds_df.head(2))
    funds_df.to_sql('funds_actives', engine, if_exists='replace', index_label='id')

    print('Inserting the metrics data...')
    funds_metrics_df = crawling_results['df'].rename(columns=FUNDS_METRICS_COLUMN_MAP)
    funds_metrics_df.to_sql('funds_metrics', engine, if_exists='replace', index_label='id')

    print('Inserting the history data...')
    funds_history_df = crawling_results['df_history'].rename(columns=FUNDS_HISTORY_COLUMN_MAP)
    funds_history_df.to_sql('funds_history', engine, if_exists='replace', index=False)

    print('Inserting the info data...')
    funds_info_df = funds_metrics_df[['code', 'sector']]
    funds_info_df.to_sql('funds', engine, if_exists='replace', index_label='id')

if __name__ == '__main__':
    run_insertion()
    print(pd.read_sql("funds_history",engine))
