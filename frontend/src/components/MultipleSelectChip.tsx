import * as React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import { Fund } from '../types'
import ListSubheader from '@mui/material/ListSubheader'
import FormHelperText from '@mui/material/FormHelperText'

const ITEM_HEIGHT = 70
const ITEM_PADDING_TOP = 30
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
}

function getStyles(value: string, selectedValues: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedValues.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

interface MultipleSelectChipProps {
  options: string[] | Fund[]
  value: string[]
  label: string
  onChange: (updatedValue: string[]) => void
  isGrouped?: boolean
  helperText?: string
}

export default function MultipleSelectChip(props: MultipleSelectChipProps) {
  const { label, options, onChange, value, isGrouped, helperText } = props
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    onChange(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const groupedFundOptions = (isGrouped) ? (
    (options as Fund[]).reduce((acc: { [key: string]: string[] }, currentFund: Fund) => {
      if (acc[currentFund.sector]) {
        return {...acc, [currentFund.sector]: [...acc[currentFund.sector], currentFund.code]}
      }

      return {...acc, [currentFund.sector]: [currentFund.code]}
    }, {} as { [key: string]: string[] })
  ) : undefined

  return (
    <div>
      <FormControl sx={{ mt: 2 }} fullWidth>
        <InputLabel id="multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Boolean(isGrouped && groupedFundOptions) && Object.keys(groupedFundOptions!).sort((a, b) => a.localeCompare(b)).map((sector) => (
            [
              <ListSubheader key={sector}>{sector}</ListSubheader>,
              groupedFundOptions![sector].map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  style={getStyles(option, value, theme)}
                >
                  <Checkbox checked={value.indexOf(option) > -1} />
                  {option}
                </MenuItem>
              ))
            ]
          ))}

          {!isGrouped && (options as string[]).map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, value, theme)}
            >
              <Checkbox checked={value.indexOf(option) > -1} />
              {option}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  )
}
