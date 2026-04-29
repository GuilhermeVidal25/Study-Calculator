# **🧮 Study-Calculator**
**A scientific calculator designed to study and demonstrate modern software design patterns.**

## **🚀 Engineering Differentials**
This project was developed using software design patterns that ensure high maintainability and ease of expansion. Below are the core pillars of the implementation:

### **1. Operation Mapping (MATH_MAP)**
Instead of using extensive conditional structures (`if/else` or `switch`), we utilized the **Data Mapping** pattern.
* **Advantage:** Special operations (SIN, COS, TAN, SQRT) do not have isolated functions in the main body. They share the same logic within the `execSpec` function.
* **Scalability:** To add new features (e.g., Logarithms, Factorials), you simply add a single line to the `MATH_MAP` object. The code adapts automatically.

### **2. Centralized State (State Management)**
Application control does not rely on scattered global variables. We use a single `state` object.
* **Advantage:** Simplifies bug tracking and data flow monitoring.
* **Modernity:** This approach facilitates a future transition to reactive frameworks like **React, Vue, or Angular**, which utilize the "Single Source of Truth" concept.

### **3. Separation of Concerns (SoC)**
We applied the **Separation of Concerns** principle to keep the codebase clean:
* **Business Logic (actions):** Strictly responsible for processing calculations and validations.
* **Interface (sync/render):** A function dedicated exclusively to updating the DOM based on the current state. They do not overlap, making the code easier to test and maintain.

### **4. Execution Security**
To resolve arithmetic expressions, we opted for `new Function()` instead of the traditional `eval()`.
* **Advantage:** While the risk is low in simple applications, `new Function()` offers a slightly more restricted and controlled scope, demonstrating an active concern for security and string execution best practices.

## **🎨 Interface & UX**
* **Design:** Clean aesthetic based on soft color palettes (**Slate, Orange, Indigo**) and high-readability typography (**Inter**).
* **Micro-interactions:** Tactile feedback through scale transforms (0.96x) on click and smooth transitions via **Cubic-Bézier** curves.
* **SEO:** Implementation of semantic tags and meta-descriptions to ensure visibility in search engines.

## **🛠️ Technologies**
* **HTML5 (Semantic)**
* **Tailwind CSS (Utility-First Styling)**
* **JavaScript ES6+ (Functional Architecture)**

---
*Developed with a focus on scalability and modern web development patterns.*
