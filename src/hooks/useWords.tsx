import { createContext, useContext, useState, useEffect } from 'react'
import { WORDS } from '../constants/wordlist'
import { localeAwareUpperCase } from '../lib/words'

type WordsContextType = {
  wordLength: number
  wordsList: string[]
  solution: string
  solutionIndex: number
  setWordLength: Function
}

export const WordsContext = createContext<WordsContextType>({
  wordLength: 3,
  wordsList: [],
  solution: '',
  solutionIndex: 0,
  setWordLength: () => {},
})

export const WordsProvider: React.FunctionComponent = ({ children }) => {
  const [wordLength, setWordLength] = useState(3)
  const [wordsList, setWordsList] = useState<string[]>([])
  const [solution, setSolution] = useState('')
  const [solutionIndex, setSolutionIndex] = useState(0)

  useEffect(() => {
    setWordsList(WORDS.filter((word) => word.length === wordLength))
  }, [wordLength])

  useEffect(() => {
    if (wordsList.length > 0) {
      const _index = Math.floor(Math.random() * wordsList.length)
      const _solution = wordsList[_index]
      setSolutionIndex(WORDS.indexOf(_solution)) // using WORDS instead of wordsList so that index is unique even for 3 or 4 letter games
      setSolution(localeAwareUpperCase(_solution))
    }
  }, [wordsList])

  return (
    <WordsContext.Provider
      value={{
        wordLength,
        wordsList,
        solution,
        solutionIndex,
        setWordLength,
      }}
    >
      {children}
    </WordsContext.Provider>
  )
}

export const useWords = () => useContext(WordsContext)
