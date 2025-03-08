import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the difference between == and === in PHP?',
    options: [
      'Both operators perform the same comparison',
      'One checks value only, one checks value and type',
      'One checks type only, one checks value and type',
      'They differ only in performance optimization'
    ],
    correctAnswer: 1,
    explanation: '== performs type coercion before comparison (loose equality), while === (strict equality) compares both value and type without type coercion. For example: "5" == 5 returns true, but "5" === 5 returns false.'
  },
  {
    id: 2,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What are magic methods in PHP?',
    options: [
      'Special methods with automatic invocation',
      'Methods prefixed with double underscores',
      'Methods with dynamic runtime behavior',
      'Methods with predefined PHP triggers'
    ],
    correctAnswer: 3,
    explanation: 'Magic methods in PHP start with double underscore (__) and are automatically called by PHP in specific situations. Common examples include __construct() for object initialization, __get()/__set() for property access, __call() for method calls, and __toString() for string conversion.'
  },
  {
    id: 3,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'What is the difference between CHAR and VARCHAR?',
    options: [
      'Fixed vs variable length storage types',
      'Character vs variable data storage',
      'Performance-optimized storage types',
      'Equivalent storage implementations'
    ],
    correctAnswer: 1,
    explanation: 'CHAR is fixed-length and padded with spaces to the specified length, while VARCHAR is variable-length and only stores the actual data plus a length prefix. For example, CHAR(10) always uses 10 bytes of storage, while VARCHAR(10) uses only what it needs plus 1-2 bytes for length.'
  },
  {
    id: 4,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is an index in MySQL?',
    code: 'CREATE INDEX idx_lastname ON users(lastname);',
    options: [
      'Database structural metadata storage',
      'Data retrieval optimization structure',
      'Table relationship constraint type',
      'Advanced table joining mechanism'
    ],
    correctAnswer: 1,
    explanation: 'An index is a data structure that improves the speed of data retrieval operations on database tables by creating a separate structure that points to the rows in a table, similar to a book\'s index. While it speeds up SELECT queries, it adds overhead to INSERT, UPDATE, and DELETE operations and requires additional storage space.'
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
      'Displays original value (5)',
      'Shows incremented value (6)',
      'Raises scope error message',
      'Returns undefined result'
    ],
    correctAnswer: 1,
    explanation: 'The global keyword makes the variable $x accessible inside the function scope. Without global, the function would create a new local variable. The output is 6 because: 1) global $x references the global variable, 2) $x++ increments it from 5 to 6, 3) echo outputs the new value.'
  },
  {
    id: 6,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'Which of the following is the correct way to start a PHP session?',
    options: [
      'Using session_start() function',
      'Using start_session() function',
      'Using $_SESSION.start() method',
      'Using Session::begin() method'
    ],
    correctAnswer: 0,
    explanation: 'session_start() is the correct function to initialize a new session or resume an existing session in PHP. It must be called before any output is sent to the browser and creates a unique session ID stored in a cookie. This function also loads any existing session variables into the $_SESSION superglobal array.'
  },
  {
    id: 7,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the difference between include and require in PHP?',
    options: [
      'Both handle files identically',
      'Different error handling levels',
      'Different processing speeds',
      'Different file type handling'
    ],
    correctAnswer: 1,
    explanation: 'When a file is included with include(), a warning (E_WARNING) is issued if the file cannot be found and the script continues execution. require() will produce a fatal error (E_COMPILE_ERROR) and halt the script execution. Use require() when the file is absolutely necessary for the application to function.'
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
      'Both joins function identically',
      'Different row matching behavior',
      'Different performance profiles',
      'Different table count limits'
    ],
    correctAnswer: 1,
    explanation: 'INNER JOIN returns only the rows where there is a match in both tables based on the join condition. LEFT JOIN returns all rows from the left table and matching rows from the right table (or NULL for non-matches). For example, in an users-orders relationship, LEFT JOIN would show all users even those without orders, while INNER JOIN would only show users who have placed orders.'
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
      'Alternative to WHERE filtering',
      'Post-aggregation group filter',
      'Result set sorting method',
      'Table relationship handler'
    ],
    correctAnswer: 1,
    explanation: 'HAVING filters groups after GROUP BY aggregation, while WHERE filters individual rows before grouping. HAVING can use aggregate functions (COUNT, SUM, AVG, etc.) because it operates on grouped data. In the example, it shows only departments with more than 10 employees after counting employees per department.'
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
      'Displays "Hello Hello"',
      'Displays "World World"',
      'Displays "World Hello"',
      'Displays "Hello World"'
    ],
    correctAnswer: 2,
    explanation: 'The closure gets its own copy of the $message variable through the use keyword (value is copied at closure creation). Modifying it inside the closure affects only the closure\'s copy, not the original variable. This demonstrates variable scope and closure binding in PHP. Output is "World Hello" because the closure\'s $message becomes "World" but the outer $message remains "Hello".'
  },
  {
    id: 11,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'Which MySQL command is used to modify existing data in a table?',
    options: [
      'Using MODIFY statement',
      'Using UPDATE statement',
      'Using CHANGE statement',
      'Using ALTER statement'
    ],
    correctAnswer: 1,
    explanation: 'The UPDATE command modifies existing records in a table. The basic syntax is "UPDATE table SET column = value WHERE condition". ALTER is for changing table structure (like adding/removing columns), while MODIFY and CHANGE are used within ALTER TABLE to modify column definitions.'
  },
  {
    id: 12,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the purpose of the final keyword in PHP?',
    options: [
      'Declares immutable variables',
      'Prevents inheritance/overriding',
      'Terminates code execution',
      'Marks array termination'
    ],
    correctAnswer: 1,
    explanation: 'The final keyword in PHP has two uses: 1) When applied to a class, it prevents other classes from inheriting from it, 2) When applied to a method, it prevents child classes from overriding that method. This is useful for security and maintaining implementation integrity in your codebase.'
  },
  {
    id: 13,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is the difference between DELETE and TRUNCATE in MySQL?',
    code: `DELETE FROM users;
TRUNCATE TABLE users;`,
    options: [
      'Identical data removal methods',
      'Different transaction behaviors',
      'Different execution speeds',
      'Different scope of operation'
    ],
    correctAnswer: 1,
    explanation: 'TRUNCATE TABLE is a DDL (Data Definition Language) command that removes all rows at once by deallocating the data pages, making it faster but non-reversible. DELETE is a DML (Data Manipulation Language) command that removes rows one by one and can be rolled back. TRUNCATE also resets auto-increment counters, while DELETE preserves them.'
  },
  {
    id: 14,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'Which superglobal variable in PHP is used to collect form data after submitting an HTML form with method="post"?',
    options: [
      'Global $_GET array',
      'Global $_POST array',
      'Global $_REQUEST array',
      'Global $GLOBALS array'
    ],
    correctAnswer: 1,
    explanation: '$_POST is a superglobal array that collects form data sent with HTTP POST method. Unlike $_GET, POST data is not visible in the URL, has no size limitations imposed by browser URL length, and is more secure for sensitive data. However, POST requests are not bookmarkable and can\'t be cached.'
  },
  {
    id: 15,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is the purpose of EXPLAIN in MySQL?',
    code: 'EXPLAIN SELECT * FROM users WHERE email LIKE "%@gmail.com";',
    options: [
      'Shows query syntax details',
      'Shows execution optimization',
      'Shows database structure',
      'Shows system documentation'
    ],
    correctAnswer: 1,
    explanation: 'EXPLAIN provides detailed information about how MySQL executes a query, including: 1) Which indexes are used, 2) How tables are joined, 3) How many rows are examined, 4) Whether temporary tables or file sorts are needed. This information is crucial for query optimization and performance tuning.'
  },
  {
    id: 16,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the purpose of the PHP trait?',
    options: [
      'Enables multiple inheritance',
      'Defines interface contracts',
      'Enables method sharing',
      'Creates abstract templates'
    ],
    correctAnswer: 2,
    explanation: 'Traits are a mechanism for code reuse in single inheritance languages like PHP. They allow you to reuse sets of methods freely in several independent classes living in different class hierarchies. Traits are similar to abstract classes but can be used to achieve a form of multiple inheritance while avoiding its complications.'
  },
  {
    id: 17,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is the difference between MyISAM and InnoDB storage engines?',
    options: [
      'Engine generation difference',
      'Transaction support variance',
      'Storage feature differences',
      'Performance characteristics'
    ],
    correctAnswer: 2,
    explanation: 'InnoDB and MyISAM are MySQL storage engines with different features: 1) InnoDB supports ACID transactions and foreign keys, 2) InnoDB uses row-level locking while MyISAM uses table-level locking, 3) InnoDB is better for write-heavy applications and data integrity, while MyISAM might be better for read-heavy, simple applications.'
  },
  {
    id: 18,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the purpose of the PHP header() function?',
    options: [
      'Manages HTML header tags',
      'Manages HTTP headers',
      'Manages page styling',
      'Manages file includes'
    ],
    correctAnswer: 1,
    explanation: 'The header() function sends raw HTTP headers to the client. It must be called before any actual output is sent (including HTML, blank lines, etc.). Common uses include: redirecting users, setting content types, controlling caching, and managing cookies. For example: header("Location: index.php") for redirects.'
  },
  {
    id: 19,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is a stored procedure in MySQL?',
    code: `DELIMITER //
CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT * FROM users;
END //
DELIMITER ;`,
    options: [
      'Query result storage system',
      'Reusable SQL code block',
      'Database backup mechanism',
      'Index optimization method'
    ],
    correctAnswer: 1,
    explanation: 'A stored procedure is a prepared SQL code that can be saved and reused. Benefits include: 1) Improved performance as procedures are pre-compiled, 2) Reduced network traffic as only the call is sent, 3) Better security through encapsulation, 4) Code reusability. They can accept parameters, perform complex operations, and return results.'
  },
  {
    id: 20,
    category: 'PHP',
    difficulty: 'Hard',
    question: 'What is the output of this code?',
    code: `$array = [1, 2, 3];
$ref = &$array;
unset($array);
var_dump($ref);`,
    options: [
      'Returns null value',
      'Shows undefined error',
      'Preserves array data',
      'Shows reference error'
    ],
    correctAnswer: 2,
    explanation: 'References in PHP allow you to create a second variable that references the same value. When using &$array, $ref becomes a reference to $array\'s value, not a copy. Unsetting $array only removes that name\'s reference to the value, but the value remains accessible through $ref. This demonstrates PHP\'s reference counting and garbage collection.'
  },
  {
    id: 21,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'What is the purpose of the LIMIT clause in MySQL?',
    code: 'SELECT * FROM users LIMIT 10 OFFSET 20;',
    options: [
      'Controls database size',
      'Controls result count',
      'Controls table count',
      'Controls query time'
    ],
    correctAnswer: 1,
    explanation: 'LIMIT clause restricts the number of rows returned by a query. When used with OFFSET, it enables pagination. For example, LIMIT 10 OFFSET 20 skips the first 20 results and returns the next 10 rows. This is crucial for performance when dealing with large datasets and implementing paginated displays.'
  },
  {
    id: 22,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the difference between htmlspecialchars() and htmlentities()?',
    options: [
      'Identical character encoding',
      'Different encoding scopes',
      'Different processing speeds',
      'Different security levels'
    ],
    correctAnswer: 1,
    explanation: 'htmlspecialchars() converts special characters to HTML entities (< to &lt;, > to &gt;, etc.) to prevent XSS attacks, while htmlentities() converts all applicable characters to HTML entities (including é to &eacute;, etc.). htmlspecialchars() is more commonly used for basic XSS prevention as it preserves readable text while securing output.'
  },
  {
    id: 23,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is a deadlock in MySQL and how can it be prevented?',
    options: [
      'Unrecoverable system state',
      'Circular lock dependency',
      'Infinite query execution',
      'Resource capacity limit'
    ],
    correctAnswer: 1,
    explanation: 'A deadlock occurs when two or more transactions are waiting for each other to release locks, creating a circular dependency. Prevention strategies include: 1) Consistent order of operations, 2) Keeping transactions short, 3) Using timeouts, 4) Designing proper indexing, 5) Using row-level locking where possible.'
  },
  {
    id: 24,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the purpose of the PHP isset() function?',
    code: `$value = null;
var_dump(isset($value));
var_dump(isset($undefined));`,
    options: [
      'Assigns variable values',
      'Checks variable state',
      'Creates variable scope',
      'Validates input data'
    ],
    correctAnswer: 1,
    explanation: 'isset() checks if a variable is both declared and not null. It returns false for: 1) Undeclared variables, 2) Variables set to null, 3) Variables that have been unset(). It\'s commonly used for form validation, checking array keys, and avoiding undefined variable warnings. Note that isset() on array elements is faster than array_key_exists().'
  },
  {
    id: 25,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is the purpose of the MySQL EXPLAIN statement?',
    code: 'EXPLAIN SELECT * FROM users WHERE email LIKE "%@gmail.com";',
    options: [
      'Validates query syntax',
      'Analyzes query plan',
      'Documents schema',
      'Debug query errors'
    ],
    correctAnswer: 1,
    explanation: 'EXPLAIN analyzes and displays the query execution plan, showing: 1) Table access methods (e.g., full scan vs index), 2) Join types and order, 3) Index usage, 4) Number of rows examined, 5) Filtering conditions. This information is vital for identifying performance bottlenecks and optimizing queries for better execution speed.'
  }
]; 