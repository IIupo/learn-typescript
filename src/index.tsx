import { createRoot } from "react-dom/client";

import { TodoApp } from "./TodoApp";
import { StrictMode } from "react";
import React from "react";

createRoot(document.getElementById("root")!).render(
    <TodoApp />
);