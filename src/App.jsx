import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Flex, Text, Button, Grid, Box } from '@radix-ui/themes';
import Taskcard from './components/Taskcard';

export default function App() {
  return (
    <Flex wrap='wrap' justify={"between"}>
      <Taskcard></Taskcard>
    </Flex>
  );
}

