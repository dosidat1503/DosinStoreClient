import React, { SyntheticEvent } from 'react';
import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography,
  Paper,
  AutocompleteChangeReason,
  AutocompleteChangeDetails
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components cho giao diện đẹp hơn
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxHeight: 200,
  overflow: 'auto',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.25),
  height: 24,
}));

interface AutocompleteInputProps {
  label?: string;
  placeholder?: string;
  options: string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  freeSolo?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label = "Chọn hoặc nhập giá trị",
  placeholder = "Nhập để tìm kiếm hoặc thêm mới...",
  options = [],
  value,
  onChange,
  multiple = false,
  freeSolo = true,
  disabled = false,
  error = false,
  helperText,
  size = 'medium',
  fullWidth = true,
}) => {
  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: string | string[] | null,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    if (onChange) {
      onChange(newValue || (multiple ? [] : ''));
    }
  };

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <Autocomplete
        multiple={multiple}
        freeSolo={freeSolo}
        options={options}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        size={size}
        PaperComponent={StyledPaper}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <StyledChip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={index}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            variant="outlined"
            fullWidth={fullWidth}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Typography variant="body2">
              {option}
            </Typography>
          </Box>
        )}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) =>
            typeof option === 'string' && 
            option.toLowerCase().includes(params.inputValue.toLowerCase())
          );

          const { inputValue } = params;
          // Gợi ý thêm mới nếu không tìm thấy
          const isExisting = options.some((option) => 
            typeof option === 'string' &&
            inputValue.toLowerCase() === option.toLowerCase()
          );
          if (inputValue !== '' && !isExisting && freeSolo) {
            filtered.push(`Thêm "${inputValue}"`);
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          // Xử lý cho trường hợp "Thêm mới"
          if (typeof option === 'string' && option.startsWith('Thêm "')) {
            return option.slice(6, -1); // Loại bỏ 'Thêm "' và '"'
          }
          return typeof option === 'string' ? option : '';
        }}
      />
    </Box>
  );
};

export default AutocompleteInput;