import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {RoutesFront} from "../src/routes/RoutesFront"


export function App() {
  return (
    <BrowserRouter>
      <RoutesFront />
    </BrowserRouter>
  ) 
}

export default App
