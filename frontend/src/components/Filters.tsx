import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import { FundsContext } from '../contexts/FundsContext'
import MultipleSelectChip from './MultipleSelectChip'
import { Fund } from '../types'


interface FilterProps {
  onSubmit: (activeFunds: string[] | null) => void
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function Filters(props: FilterProps) {
  const { onSubmit } = props

  const { funds } = useContext(FundsContext)
  const [expanded, setExpanded] = React.useState(true)
  const [selectedFunds, setSelectedFunds] = React.useState<Fund[]>([])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleSelectedFunds = (selectedFundsCodes: string[]) => {
    setSelectedFunds(funds.filter(f => selectedFundsCodes.includes(f.code)))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(selectedFunds ? selectedFunds?.map(f => f.code) : null)
  }

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(null)
    setSelectedFunds([])
  }

  return (
    <Card>
      <CardHeader
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
        title="Filtros"
        subheader="Selecione os fundos do seu interesse"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <CardContent>
              <MultipleSelectChip
                isGrouped
                label='Fundos'
                value={selectedFunds.map(f => f.code)}
                options={funds}
                onChange={handleSelectedFunds}
                helperText='Limpe o formulário para visualizar dados de todos* os fundos'
              />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="secondary"> Filtrar </Button>
            <Button type="reset" variant="outlined" color="info"> Limpar </Button>
          </CardActions>
        </form>
      </Collapse>
    </Card>
  )
}
