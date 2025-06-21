import './App.css'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { Header } from '@/Header'
import { selectThemeMode } from '@/app/app-selectors'
import { getTheme } from '@/common/theme/theme'
import { Main } from '@/app/Main'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)  

  const theme = getTheme(themeMode)  

  return (
      <ThemeProvider theme={theme}>
        <div className={'app'}>
          <CssBaseline />
          <Header />
          <Main />
        </div>
      </ThemeProvider>
  )
}
