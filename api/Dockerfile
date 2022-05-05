FROM python:3.9-slim-buster

COPY . /code

WORKDIR /code
RUN pip3 install -e .

CMD ["./entrypoint.sh"]
