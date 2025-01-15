"use client";

import { useState } from "react";
import Image from "next/image";

interface TodoItem {
  id: number;
  text: string;
  dueDate: string;
  completed: boolean;
}

const momTypes = {
  accusatory: {
    name: "Accusatory Mom",
    image: "/moms/accusatorr.png",
  },
  angry: {
    name: "Angry Mom",
    image: "/moms/angry.png",
  },
  disappointed: {
    name: "Disappointed Mom",
    image: "/moms/dissapointed.png",
  },
};

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedMom, setSelectedMom] = useState<keyof typeof momTypes>("accusatory");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const newItem: TodoItem = {
      id: Date.now(),
      text: newTodo,
      dueDate: dueDate,
      completed: false
    };
    
    setTodos([...todos, newItem]);
    setNewTodo("");
    setDueDate("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ).sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    }));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto bg-white">
      <div className="flex flex-col items-center mb-8">
        <div className="w-full flex justify-between items-center mb-4">
          <select
            value={selectedMom}
            onChange={(e) => setSelectedMom(e.target.value as keyof typeof momTypes)}
            className="p-2 border rounded-md text-black bg-white focus:bg-white"
          >
            {Object.entries(momTypes).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
          <h1 className="text-3xl text-center text-black">Mom.ai</h1>
          <div className="w-[100px]"></div> {/* Spacer for alignment */}
        </div>
        
        <div className="relative w-[600px] h-[600px] -my-8">
          <Image
            src={momTypes[selectedMom].image}
            alt={momTypes[selectedMom].name}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      <form onSubmit={addTodo} className="mb-8 space-y-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
            className="p-2 border rounded-md text-black bg-white focus:bg-white"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded-md text-black bg-white focus:bg-white"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Add Task
        </button>
      </form>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li 
            key={todo.id}
            className={`flex items-center justify-between p-4 border rounded-md ${
              todo.completed ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5"
              />
              <div className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
                <p className="font-medium">{todo.text}</p>
                <p className="text-sm text-gray-600">Due: {todo.dueDate}</p>
              </div>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
