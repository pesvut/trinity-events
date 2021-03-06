import { useState } from 'react'

//for basic values
export function useLocaleState(localItem) {
  const [loc, setState] = useState(localStorage.getItem(localItem))
  const setLoc = (newItem) => {
    setState(newItem)
    localStorage.setItem(localItem, newItem)
  }
  return [loc, setLoc]
}

//for sets
export function useLocaleSetsState(localItem) {
  //turn string to object to set
  const savedValue = localStorage.getItem(localItem)
  const [loc, setState] = useState( savedValue ? new Set( JSON.parse(savedValue) ) : new Set() )

  //save object as string
  const setLoc = (newItem) => {
    setState(newItem)
    localStorage.setItem(localItem, JSON.stringify([...newItem]))
  }

  if (!loc) setLoc(new Set())

  return [loc, setLoc]
}

// for objects
export function useLocaleObjectState(localItem, defaultValue = {}) {
  //turn string to object
  const savedValue = localStorage.getItem(localItem)
  const [loc, setState] = useState( savedValue ? JSON.parse(savedValue) : defaultValue )

  //turn object to string
  const setLoc = (newItem) => {
    setState(newItem)
    localStorage.setItem(localItem, JSON.stringify(newItem))
  }

  return [loc, setLoc]
}