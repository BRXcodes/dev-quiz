import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the difference between == and === in PHP?',
    options: [
      'There is no difference',
      '== checks only value, === checks both value and type',
      '=== checks only value, == checks both value and type',
      'Both operators work the same way but === is faster'
    ],
    correctAnswer: 1,
    explanation: '== performs type coercion before comparison while === compares both value and type without type coercion.'
  },
  {
    id: 2,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What are magic methods in PHP?',
    options: [
      'Methods that can perform magic tricks',
      'Methods that start with double underscore (__)',
      'Methods that are automatically called by PHP',
      'Both B and C are correct'
    ],
    correctAnswer: 3,
    explanation: 'Magic methods in PHP start with double underscore (__) and are automatically called by PHP in certain situations.'
  },
  {
    id: 3,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'What is the difference between CHAR and VARCHAR?',
    options: [
      'CHAR is for characters, VARCHAR is for variables',
      'CHAR has fixed length, VARCHAR has variable length',
      'VARCHAR is faster than CHAR',
      'There is no difference'
    ],
    correctAnswer: 1,
    explanation: 'CHAR is fixed-length and padded with spaces, while VARCHAR is variable-length and stores only the actual data plus length prefix.'
  },
  {
    id: 4,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is an index in MySQL?',
    code: 'CREATE INDEX idx_lastname ON users(lastname);',
    options: [
      'A table that contains all database metadata',
      'A data structure that improves the speed of data retrieval',
      'A primary key constraint',
      'A type of JOIN operation'
    ],
    correctAnswer: 1,
    explanation: 'An index is a data structure that improves the speed of data retrieval operations on database tables at the cost of additional storage and slower writes.'
  },
  {
    id: 5,
    category: 'PHP',
    difficulty: 'Hard',
    question: 'What is the output of the following code?',
    code: `$x = 5;
function foo() {
    global $x;
    $x++;
    echo $x;
}
foo();`,
    options: [
      '5',
      '6',
      'Undefined variable error',
      'null'
    ],
    correctAnswer: 1,
    explanation: 'The global keyword makes the variable $x accessible inside the function, and the output will be 6 after incrementing.'
  },
  {
    id: 6,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'Which of the following is the correct way to start a PHP session?',
    options: [
      'session_start()',
      'start_session()',
      '$_SESSION.start()',
      'Session::begin()'
    ],
    correctAnswer: 0,
    explanation: 'session_start() is the correct function to initialize a new session or resume an existing session in PHP.'
  },
  {
    id: 7,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the difference between include and require in PHP?',
    options: [
      'There is no difference',
      'include produces a warning on failure, require produces a fatal error',
      'require is faster than include',
      'include is used for classes, require is used for functions'
    ],
    correctAnswer: 1,
    explanation: 'When a file is included with include(), a warning is issued if the file cannot be found, while require() will produce a fatal error and halt the execution.'
  },
  {
    id: 8,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    code: `SELECT * FROM users 
INNER JOIN orders ON users.id = orders.user_id;

SELECT * FROM users 
LEFT JOIN orders ON users.id = orders.user_id;`,
    options: [
      'There is no difference',
      'INNER JOIN returns matching rows only, LEFT JOIN returns all rows from left table plus matching rows from right table',
      'LEFT JOIN is faster than INNER JOIN',
      'INNER JOIN can only be used with two tables, LEFT JOIN can be used with multiple tables'
    ],
    correctAnswer: 1,
    explanation: 'INNER JOIN returns only the rows where there is a match in both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table (or NULL if no match).'
  },
  {
    id: 9,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is the purpose of the HAVING clause in MySQL?',
    code: `SELECT department, COUNT(*) as emp_count 
FROM employees 
GROUP BY department 
HAVING emp_count > 10;`,
    options: [
      'It is the same as WHERE clause',
      'It filters groups after GROUP BY aggregation',
      'It is used to sort the results',
      'It is used to join tables'
    ],
    correctAnswer: 1,
    explanation: 'HAVING is used to filter groups after GROUP BY aggregation, while WHERE filters individual rows before grouping. HAVING can use aggregate functions like COUNT, SUM, etc.'
  },
  {
    id: 10,
    category: 'PHP',
    difficulty: 'Hard',
    question: 'What is the output of this closure code?',
    code: `$message = 'Hello';
$example = function () use ($message) {
    $message = 'World';
    echo $message;
};
$example();
echo $message;`,
    options: [
      'Hello Hello',
      'World World',
      'World Hello',
      'Hello World'
    ],
    correctAnswer: 2,
    explanation: 'The closure gets its own copy of the $message variable through the use keyword. Modifying it inside the closure does not affect the original variable outside.'
  },
  {
    id: 11,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'Which MySQL command is used to modify existing data in a table?',
    options: [
      'MODIFY',
      'UPDATE',
      'CHANGE',
      'ALTER'
    ],
    correctAnswer: 1,
    explanation: 'The UPDATE command is used to modify existing records in a table. ALTER is used for table structure, while MODIFY and CHANGE are used for column definitions.'
  },
  {
    id: 12,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the purpose of the final keyword in PHP?',
    options: [
      'To declare a constant variable',
      'To prevent class inheritance and method overriding',
      'To end a loop or function',
      'To define the last element of an array'
    ],
    correctAnswer: 1,
    explanation: 'The final keyword prevents child classes from overriding a method or extending a class. When used on a class, it cannot be inherited; when used on a method, it cannot be overridden.'
  },
  {
    id: 13,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is the difference between DELETE and TRUNCATE in MySQL?',
    code: `DELETE FROM users;
TRUNCATE TABLE users;`,
    options: [
      'They are exactly the same',
      'DELETE removes rows one by one and can be rolled back, TRUNCATE removes all rows at once and cannot be rolled back',
      'TRUNCATE is slower than DELETE',
      'DELETE is used for tables, TRUNCATE is used for databases'
    ],
    correctAnswer: 1,
    explanation: 'TRUNCATE is faster as it drops and recreates the table, but cannot be rolled back and resets auto-increment counters. DELETE removes rows one by one, can be rolled back, and maintains auto-increment values.'
  },
  {
    id: 14,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'Which superglobal variable in PHP is used to collect form data after submitting an HTML form with method="post"?',
    options: [
      '$_GET',
      '$_POST',
      '$_REQUEST',
      '$GLOBALS'
    ],
    correctAnswer: 1,
    explanation: '$_POST is used to collect form data sent with the HTTP POST method. The variables are not displayed in the URL and have no size limitations unlike $_GET.'
  },
  {
    id: 15,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is the purpose of EXPLAIN in MySQL?',
    code: 'EXPLAIN SELECT * FROM users WHERE email LIKE "%@gmail.com";',
    options: [
      'To explain the syntax of a query',
      'To show query execution plan and optimization details',
      'To display table structure',
      'To show database documentation'
    ],
    correctAnswer: 1,
    explanation: 'EXPLAIN shows how MySQL executes a query, including information about indexes used, table join order, and number of rows examined. It is useful for query optimization.'
  }
]; 