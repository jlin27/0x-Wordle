import { useWords } from '../../hooks/useWords'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const { wordLength } = useWords()

  const emptyCells = Array.from(Array(wordLength))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
