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
    explanation: '== performs type coercion before comparison (loose equality), while === (strict equality) compares both value and type without type coercion. For example: "5" == 5 returns true, but "5" === 5 returns false.',
    hint: 'Think about what happens when comparing values of different types, like a string "5" and number 5.'
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
    explanation: 'Magic methods in PHP start with double underscore (__) and are automatically called by PHP in specific situations. Common examples include __construct() for object initialization, __get()/__set() for property access, __call() for method calls, and __toString() for string conversion.',
    hint: 'These methods are automatically triggered by PHP in specific situations and follow a special naming convention.'
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
    explanation: 'CHAR is fixed-length and padded with spaces to the specified length, while VARCHAR is variable-length and only stores the actual data plus a length prefix. For example, CHAR(10) always uses 10 bytes of storage, while VARCHAR(10) uses only what it needs plus 1-2 bytes for length.',
    hint: 'Consider how these types handle strings of different lengths and their storage requirements.'
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
    explanation: 'An index is a data structure that improves the speed of data retrieval operations on database tables by creating a separate structure that points to the rows in a table, similar to a book\'s index. While it speeds up SELECT queries, it adds overhead to INSERT, UPDATE, and DELETE operations and requires additional storage space.',
    hint: 'Think about how a book\'s index helps you find information quickly.'
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
    explanation: 'The global keyword makes the variable $x accessible inside the function scope. Without global, the function would create a new local variable. The output is 6 because: 1) global $x references the global variable, 2) $x++ increments it from 5 to 6, 3) echo outputs the new value.',
    hint: 'Consider how the global keyword affects variable scope inside functions.'
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
    explanation: 'session_start() is the correct function to initialize a new session or resume an existing session in PHP. It must be called before any output is sent to the browser and creates a unique session ID stored in a cookie. This function also loads any existing session variables into the $_SESSION superglobal array.',
    hint: 'Look for the most standard PHP function naming convention.'
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
    explanation: 'When a file is included with include(), a warning (E_WARNING) is issued if the file cannot be found and the script continues execution. require() will produce a fatal error (E_COMPILE_ERROR) and halt the script execution. Use require() when the file is absolutely necessary for the application to function.',
    hint: 'Think about how critical the included file is to your application\'s functionality.'
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
    explanation: 'INNER JOIN returns only the rows where there is a match in both tables based on the join condition. LEFT JOIN returns all rows from the left table and matching rows from the right table (or NULL for non-matches). For example, in an users-orders relationship, LEFT JOIN would show all users even those without orders, while INNER JOIN would only show users who have placed orders.',
    hint: 'Consider which records are kept when matching between tables fails.'
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
    explanation: 'HAVING filters groups after GROUP BY aggregation, while WHERE filters individual rows before grouping. HAVING can use aggregate functions (COUNT, SUM, AVG, etc.) because it operates on grouped data. In the example, it shows only departments with more than 10 employees after counting employees per department.',
    hint: 'Think about when this clause is applied in relation to GROUP BY.'
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
    explanation: 'The closure gets its own copy of the $message variable through the use keyword (value is copied at closure creation). Modifying it inside the closure affects only the closure\'s copy, not the original variable. This demonstrates variable scope and closure binding in PHP. Output is "World Hello" because the closure\'s $message becomes "World" but the outer $message remains "Hello".',
    hint: 'Consider how variable scope works with closures and the use keyword.'
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
    explanation: 'The UPDATE command modifies existing records in a table. The basic syntax is "UPDATE table SET column = value WHERE condition". ALTER is for changing table structure (like adding/removing columns), while MODIFY and CHANGE are used within ALTER TABLE to modify column definitions.',
    hint: 'Consider which command modifies data within rows vs. table structure.'
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
    explanation: 'The final keyword in PHP has two uses: 1) When applied to a class, it prevents other classes from inheriting from it, 2) When applied to a method, it prevents child classes from overriding that method. This is useful for security and maintaining implementation integrity in your codebase.',
    hint: 'Think about inheritance and method overriding restrictions.'
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
    explanation: 'TRUNCATE TABLE is a DDL (Data Definition Language) command that removes all rows at once by deallocating the data pages, making it faster but non-reversible. DELETE is a DML (Data Manipulation Language) command that removes rows one by one and can be rolled back. TRUNCATE also resets auto-increment counters, while DELETE preserves them.',
    hint: 'Consider the transaction logging and rollback capabilities.'
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
    explanation: '$_POST is a superglobal array that collects form data sent with HTTP POST method. Unlike $_GET, POST data is not visible in the URL, has no size limitations imposed by browser URL length, and is more secure for sensitive data. However, POST requests are not bookmarkable and can\'t be cached.',
    hint: 'Think about which superglobal specifically handles POST request data.'
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
    explanation: 'EXPLAIN provides detailed information about how MySQL executes a query, including: 1) Which indexes are used, 2) How tables are joined, 3) How many rows are examined, 4) Whether temporary tables or file sorts are needed. This information is crucial for query optimization and performance tuning.',
    hint: 'Consider what information would help optimize query performance.'
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
    explanation: 'Traits are a mechanism for code reuse in single inheritance languages like PHP. They allow you to reuse sets of methods freely in several independent classes living in different class hierarchies. Traits are similar to abstract classes but can be used to achieve a form of multiple inheritance while avoiding its complications.',
    hint: 'Think about code reuse in a single inheritance language.'
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
    explanation: 'InnoDB and MyISAM are MySQL storage engines with different features: 1) InnoDB supports ACID transactions and foreign keys, 2) InnoDB uses row-level locking while MyISAM uses table-level locking, 3) InnoDB is better for write-heavy applications and data integrity, while MyISAM might be better for read-heavy, simple applications.',
    hint: 'Consider features like transactions and row-level locking.'
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
    explanation: 'The header() function sends raw HTTP headers to the client. It must be called before any actual output is sent (including HTML, blank lines, etc.). Common uses include: redirecting users, setting content types, controlling caching, and managing cookies. For example: header("Location: index.php") for redirects.',
    hint: 'Think about when these headers need to be sent during request processing.'
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
    explanation: 'A stored procedure is a prepared SQL code that can be saved and reused. Benefits include: 1) Improved performance as procedures are pre-compiled, 2) Reduced network traffic as only the call is sent, 3) Better security through encapsulation, 4) Code reusability. They can accept parameters, perform complex operations, and return results.',
    hint: 'Consider the benefits of pre-compiled SQL code.'
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
    explanation: 'References in PHP allow you to create a second variable that references the same value. When using &$array, $ref becomes a reference to $array\'s value, not a copy. Unsetting $array only removes that name\'s reference to the value, but the value remains accessible through $ref. This demonstrates PHP\'s reference counting and garbage collection.',
    hint: 'Think about how PHP handles variable references and memory.'
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
    explanation: 'LIMIT clause restricts the number of rows returned by a query. When used with OFFSET, it enables pagination. For example, LIMIT 10 OFFSET 20 skips the first 20 results and returns the next 10 rows. This is crucial for performance when dealing with large datasets and implementing paginated displays.',
    hint: 'Consider how this affects the number of rows in the result set.'
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
    explanation: 'htmlspecialchars() converts special characters to HTML entities (< to &lt;, > to &gt;, etc.) to prevent XSS attacks, while htmlentities() converts all applicable characters to HTML entities (including é to &eacute;, etc.). htmlspecialchars() is more commonly used for basic XSS prevention as it preserves readable text while securing output.',
    hint: 'Think about which characters each function converts to entities.'
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
    explanation: 'A deadlock occurs when two or more transactions are waiting for each other to release locks, creating a circular dependency. Prevention strategies include: 1) Consistent order of operations, 2) Keeping transactions short, 3) Using timeouts, 4) Designing proper indexing, 5) Using row-level locking where possible.',
    hint: 'Consider what happens when transactions wait for each other.'
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
    explanation: 'isset() checks if a variable is both declared and not null. It returns false for: 1) Undeclared variables, 2) Variables set to null, 3) Variables that have been unset(). It\'s commonly used for form validation, checking array keys, and avoiding undefined variable warnings. Note that isset() on array elements is faster than array_key_exists().',
    hint: 'Think about checking both variable declaration and value.'
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
    explanation: 'EXPLAIN analyzes and displays the query execution plan, showing: 1) Table access methods (e.g., full scan vs index), 2) Join types and order, 3) Index usage, 4) Number of rows examined, 5) Filtering conditions. This information is vital for identifying performance bottlenecks and optimizing queries for better execution speed.',
    hint: 'Consider what information would help optimize a query.'
  },
  {
    id: 26,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the difference between abstract classes and interfaces in PHP?',
    options: [
      'Implementation flexibility levels',
      'Method inheritance patterns',
      'Performance optimization types',
      'Code organization structures'
    ],
    correctAnswer: 1,
    explanation: 'Abstract classes can have both abstract and concrete methods, while interfaces can only declare method signatures. Key differences: 1) Classes can implement multiple interfaces but extend only one abstract class, 2) Abstract classes can have properties and constructor, interfaces cannot, 3) Interface methods must be public, abstract classes can use any visibility.',
    hint: 'Think about the differences in method implementation requirements.'
  },
  {
    id: 27,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is the purpose of a composite index in MySQL?',
    code: 'CREATE INDEX idx_name_email ON users(last_name, email);',
    options: [
      'Multiple table indexing',
      'Multi-column optimization',
      'Compound data storage',
      'Complex query routing'
    ],
    correctAnswer: 1,
    explanation: 'A composite index indexes multiple columns together. Benefits: 1) Optimizes queries filtering on multiple columns, 2) Follows "leftmost prefix" rule - can use left-side columns independently, 3) Reduces the need for multiple single-column indexes. For example, this index helps queries filtering by last_name alone or last_name AND email, but not email alone.',
    hint: 'Consider how this affects queries using multiple columns.'
  },
  {
    id: 28,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the difference between echo and print in PHP?',
    options: [
      'Output formatting options',
      'Return value behavior',
      'Performance characteristics',
      'Parameter handling methods'
    ],
    correctAnswer: 1,
    explanation: 'While both output strings, key differences are: 1) print returns a value (always 1) and can be used in expressions, echo doesn\'t return anything, 2) echo can take multiple parameters (echo $a, $b), print takes only one, 3) echo is marginally faster as it doesn\'t return a value. In practice, they\'re often used interchangeably.',
    hint: 'Think about return values and parameter handling.'
  },
  {
    id: 29,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is the purpose of the UNION operator in MySQL?',
    code: `SELECT name FROM customers
UNION
SELECT name FROM employees;`,
    options: [
      'Combines row selections',
      'Merges table structures',
      'Links related records',
      'Joins column data'
    ],
    correctAnswer: 0,
    explanation: 'UNION combines results from multiple SELECT statements: 1) Removes duplicate rows by default (use UNION ALL to keep duplicates), 2) Column count and data types must match, 3) Column names from first SELECT are used, 4) Commonly used to merge similar data from different tables. Performance note: UNION ALL is faster as it skips duplicate removal.',
    hint: 'Consider how this combines data from separate queries.'
  },
  {
    id: 30,
    category: 'PHP',
    difficulty: 'Hard',
    question: 'What is the output of this type juggling code?',
    code: `$a = "2 dogs";
$b = $a + 3;
echo $b;`,
    options: [
      'Shows "2 dogs3"',
      'Displays value 5',
      'Raises type error',
      'Returns null value'
    ],
    correctAnswer: 1,
    explanation: 'PHP\'s type juggling converts "2 dogs" to integer 2 when used in arithmetic. Process: 1) String starts with number, PHP extracts it, 2) Rest of string is ignored, 3) Numeric operation proceeds with extracted number. This is why $b becomes 5. While convenient, this implicit conversion can lead to subtle bugs - explicit casting or type checking is often safer.',
    hint: 'Think about how PHP converts strings to numbers.'
  },
  {
    id: 31,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'What is the purpose of AUTO_INCREMENT in MySQL?',
    code: 'CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY);',
    options: [
      'Automatic backup scheduling',
      'Automatic value generation',
      'Automatic index creation',
      'Automatic field updating'
    ],
    correctAnswer: 1,
    explanation: 'AUTO_INCREMENT automatically generates a unique number for a column when a new record is inserted. Key points: 1) Typically used for primary key columns, 2) Each new record gets the last value + 1, 3) Can set initial value with ALTER TABLE, 4) Only one AUTO_INCREMENT column per table, must be indexed.',
    hint: 'Consider how this helps with unique record identification.'
  },
  {
    id: 32,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the purpose of the yield keyword in PHP?',
    code: `function getNumbers() {
    for ($i = 0; $i < 1000000; $i++) {
        yield $i;
    }
}`,
    options: [
      'Memory allocation control',
      'Generator function creation',
      'Asynchronous processing',
      'Exception flow handling'
    ],
    correctAnswer: 1,
    explanation: 'yield creates a generator function that returns an iterator. Benefits: 1) Memory efficient - values generated one at a time, not stored in array, 2) Perfect for large datasets, 3) Can pause and resume execution. In the example, instead of creating a million-element array, it generates values on demand.',
    hint: 'Consider memory usage with large datasets.'
  },
  {
    id: 33,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is the difference between a LEFT JOIN and a RIGHT JOIN?',
    code: `SELECT * FROM orders RIGHT JOIN users 
  ON orders.user_id = users.id;
-- Is equivalent to:
SELECT * FROM users LEFT JOIN orders 
  ON orders.user_id = users.id;`,
    options: [
      'Direction of data flow',
      'Table priority handling',
      'Join execution order',
      'Performance optimization'
    ],
    correctAnswer: 1,
    explanation: 'LEFT and RIGHT JOINs are mirror images of each other. Key points: 1) LEFT JOIN keeps all records from left table, matching from right, 2) RIGHT JOIN keeps all from right table, matching from left, 3) Any RIGHT JOIN can be rewritten as LEFT JOIN by swapping table order, 4) LEFT JOIN is more commonly used for readability. Choice often depends on logical table relationships.',
    hint: 'Consider the direction of data flow.'
  },
  {
    id: 34,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the purpose of the PHP empty() function?',
    code: `$var = 0;
var_dump(empty($var));  // true
$var = "0";
var_dump(empty($var));  // true`,
    options: [
      'Checks variable deletion',
      'Validates value absence',
      'Removes variable data',
      'Clears memory space'
    ],
    correctAnswer: 1,
    explanation: 'empty() checks if a variable is considered empty. Returns true for: 1) "" (empty string), 2) 0 (as integer or string), 3) NULL, 4) false, 5) array(), 6) Unset/undefined variables. Unlike isset(), empty() is more permissive and won\'t trigger notices for undefined variables. Commonly used for form validation.',
    hint: 'Think about what PHP considers "empty" values.'
  },
  {
    id: 35,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is the purpose of a MySQL view?',
    code: `CREATE VIEW active_users AS
SELECT * FROM users 
WHERE last_login > DATE_SUB(NOW(), INTERVAL 30 DAY);`,
    options: [
      'Physical data storage',
      'Virtual result sets',
      'Table backup system',
      'Query cache mechanism'
    ],
    correctAnswer: 1,
    explanation: 'A view is a stored SQL query that acts as a virtual table. Benefits: 1) Simplifies complex queries by saving them as views, 2) Provides data security by restricting column/row access, 3) Ensures data consistency across applications, 4) No physical storage used - data generated on query. Views can be updatable under certain conditions.',
    hint: 'Consider how this helps simplify complex queries.'
  },
  {
    id: 36,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the purpose of the PHP $_SESSION superglobal?',
    options: [
      'To store temporary data for current user session',
      'To store permanent data in database',
      'To handle form submissions',
      'To manage cookie data'
    ],
    correctAnswer: 0,
    explanation: '$_SESSION is used to store user data across multiple pages during a session. The data persists until the browser is closed or session is explicitly destroyed. Common uses include storing login status, user preferences, and temporary data that needs to persist across multiple page loads.',
    hint: 'Think about how websites remember you are logged in while browsing different pages.'
  },
  {
    id: 37,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is the difference between WHERE and HAVING clauses in MySQL?',
    code: `SELECT department, AVG(salary) as avg_salary 
FROM employees 
WHERE salary > 30000 
GROUP BY department 
HAVING avg_salary > 50000;`,
    options: [
      'They are interchangeable clauses',
      'WHERE filters rows before grouping, HAVING filters after',
      'HAVING is used for simple conditions only',
      'WHERE is only used with GROUP BY'
    ],
    correctAnswer: 1,
    explanation: 'WHERE filters individual rows before they are grouped, while HAVING filters groups after GROUP BY is applied. HAVING can use aggregate functions (like AVG, COUNT) since it operates on grouped data, whereas WHERE cannot use aggregate functions.',
    hint: 'Consider when each clause is applied in relation to the GROUP BY operation.'
  },
  {
    id: 38,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is dependency injection in PHP and why is it used?',
    code: `class UserController {
    private $userService;
    
    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }
}`,
    options: [
      'A way to include external files',
      'A design pattern for handling dependencies',
      'A method for database connections',
      'A type of error handling'
    ],
    correctAnswer: 1,
    explanation: 'Dependency injection is a design pattern where dependencies are "injected" into a class rather than created inside it. Benefits include: 1) Better testing as dependencies can be mocked, 2) Loose coupling between classes, 3) More flexible and maintainable code, 4) Easier to modify dependencies without changing the class code.',
    hint: 'Think about how classes can receive their dependencies from outside rather than creating them internally.'
  },
  {
    id: 39,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'What is the purpose of an INDEX in MySQL?',
    code: `CREATE INDEX idx_email ON users(email);
SELECT * FROM users WHERE email = 'test@example.com';`,
    options: [
      'To format data in tables',
      'To speed up data retrieval',
      'To validate data entry',
      'To create table relationships'
    ],
    correctAnswer: 1,
    explanation: 'An INDEX is a data structure that improves the speed of data retrieval operations by providing quick access to rows in a database table. Like a book\'s index, it helps MySQL find data without scanning the entire table. However, indexes add overhead for write operations (INSERT, UPDATE, DELETE) and take additional storage space.',
    hint: 'Think about how a book\'s index helps you find information quickly.'
  },
  {
    id: 40,
    category: 'PHP',
    difficulty: 'Hard',
    question: 'What is the output of this closure code?',
    code: `$x = 1;
$closure = function() use ($x) {
    echo $x;
    $x = 2;
};
$x = 3;
$closure();
echo $x;`,
    options: [
      'Outputs "13"',
      'Outputs "33"',
      'Outputs "12"',
      'Outputs "23"'
    ],
    correctAnswer: 0,
    explanation: 'The closure captures the value of $x (1) when it\'s created, not its reference. When $x is later changed to 3 outside the closure, the closure still has the original value (1). The change to $x inside the closure only affects the closure\'s copy. Therefore, it outputs "1" from the closure and "3" from the echo statement.',
    hint: 'Consider how closures capture variables by value using the "use" keyword.'
  },
  {
    id: 41,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    code: `-- Query 1
SELECT users.name, orders.order_date 
FROM users INNER JOIN orders 
ON users.id = orders.user_id;

-- Query 2
SELECT users.name, orders.order_date 
FROM users LEFT JOIN orders 
ON users.id = orders.user_id;`,
    options: [
      'No difference in result set',
      'LEFT JOIN includes unmatched rows',
      'INNER JOIN is faster',
      'LEFT JOIN uses less memory'
    ],
    correctAnswer: 1,
    explanation: 'INNER JOIN returns only rows where there\'s a match in both tables. LEFT JOIN returns all rows from the left table (users) and matching rows from the right table (orders). If there\'s no match, NULL values are returned for the right table columns. This is useful when you want to see all users, even those without orders.',
    hint: 'Think about what happens to rows that don\'t have matches in the other table.'
  },
  {
    id: 42,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the difference between include and require in PHP?',
    options: [
      'No difference, they are aliases',
      'require stops execution on error',
      'include is faster',
      'require works with remote files'
    ],
    correctAnswer: 1,
    explanation: 'require generates a fatal error (E_COMPILE_ERROR) and stops script execution if the file is not found or cannot be included. include only generates a warning (E_WARNING) and continues script execution. Use require when the file is absolutely necessary for the application to function, and include when the file is optional.',
    hint: 'Think about how critical the included file is to your application.'
  },
  {
    id: 43,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is the purpose of a transaction in MySQL?',
    code: `START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
    options: [
      'To improve query performance',
      'To ensure data consistency',
      'To compress database size',
      'To create database backups'
    ],
    correctAnswer: 1,
    explanation: 'Transactions ensure that a series of SQL operations are executed as a single unit of work. They follow ACID properties: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don\'t interfere), and Durability (committed changes persist). If any operation fails, the entire transaction is rolled back.',
    hint: 'Consider what happens if power fails during a bank transfer between accounts.'
  },
  {
    id: 44,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the purpose of PHP namespaces?',
    code: `namespace App\\Controllers;

use App\\Models\\User;
use App\\Services\\Auth;

class UserController {
    // ...
}`,
    options: [
      'To organize code into folders',
      'To avoid name collisions',
      'To improve code performance',
      'To create private classes'
    ],
    correctAnswer: 1,
    explanation: 'Namespaces solve two problems: 1) Name collisions between code you create and internal/third-party classes/libraries, 2) Ability to alias (shorten) long names to improve readability. They provide a way to encapsulate related items and are especially important in larger applications.',
    hint: 'Think about how different libraries might have classes with the same name.'
  },
  {
    id: 45,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'What is the purpose of the GROUP BY clause?',
    code: `SELECT department, COUNT(*) as employee_count,
       AVG(salary) as avg_salary
FROM employees
GROUP BY department;`,
    options: [
      'To sort results',
      'To group rows for aggregation',
      'To filter results',
      'To join tables'
    ],
    correctAnswer: 1,
    explanation: 'GROUP BY groups rows that have the same values in specified columns into summary rows. It\'s typically used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to generate summary reports. Each group in the result set contains one row for each unique value of the grouped column.',
    hint: 'Think about how you would calculate statistics for different categories.'
  },
  {
    id: 46,
    category: 'PHP',
    difficulty: 'Hard',
    question: 'What is the difference between abstract classes and traits in PHP?',
    code: `abstract class Database {
    abstract public function connect();
    public function query() { /* ... */ }
}

trait Loggable {
    public function log($message) { /* ... */ }
}`,
    options: [
      'No significant differences',
      'Multiple traits can be used',
      'Abstract classes are faster',
      'Traits support multiple inheritance'
    ],
    correctAnswer: 1,
    explanation: 'Key differences: 1) A class can implement multiple traits but can extend only one abstract class, 2) Abstract classes can have constructor methods and properties, traits cannot, 3) Abstract classes can define a common interface with some implemented methods, while traits are purely for code reuse, 4) Traits cannot enforce method implementation like abstract classes can.',
    hint: 'Consider the limitations of single inheritance in PHP.'
  },
  {
    id: 47,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is a subquery in MySQL and when should it be used?',
    code: `SELECT name, salary 
FROM employees 
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
);`,
    options: [
      'A query inside another query',
      'A backup query if main fails',
      'A query that runs faster',
      'A simplified query format'
    ],
    correctAnswer: 0,
    explanation: 'A subquery is a query nested inside another query. Use cases: 1) Comparing values against aggregated results, 2) Checking existence of related records, 3) Creating derived tables for complex calculations. While powerful, subqueries can impact performance and should be used judiciously - sometimes JOINs are more efficient.',
    hint: 'Think about when you need to use the result of one query in another query.'
  },
  {
    id: 48,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What are PHP magic constants?',
    code: `echo __FILE__;  // Full path of this file
echo __LINE__;  // Current line number
echo __CLASS__; // Current class name`,
    options: [
      'User-defined constants',
      'Predefined special values',
      'Mathematical constants',
      'Configuration values'
    ],
    correctAnswer: 1,
    explanation: 'Magic constants are predefined constants that change value depending on where they are used. Common ones include: __LINE__ (current line), __FILE__ (current file path), __DIR__ (directory of file), __CLASS__ (current class), __METHOD__ (current method), __NAMESPACE__ (current namespace). They\'re useful for debugging and logging.',
    hint: 'Think about values that PHP automatically provides based on the current context.'
  },
  {
    id: 49,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is the difference between DELETE and TRUNCATE in MySQL?',
    code: `-- Query 1
DELETE FROM users;

-- Query 2
TRUNCATE TABLE users;`,
    options: [
      'No practical difference',
      'Different transaction handling',
      'TRUNCATE is slower',
      'DELETE is more secure'
    ],
    correctAnswer: 1,
    explanation: 'Key differences: 1) TRUNCATE is DDL (resets auto-increment), DELETE is DML, 2) TRUNCATE cannot be rolled back in transactions, DELETE can, 3) TRUNCATE is faster as it drops and recreates the table, 4) DELETE removes rows one by one and logs each deletion. Use TRUNCATE for complete table cleanup, DELETE for conditional row removal.',
    hint: 'Consider how each command handles transactions and auto-increment values.'
  },
  {
    id: 50,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the purpose of the PHP yield keyword?',
    code: `function getRange($max) {
    for ($i = 0; $i < $max; $i++) {
        yield $i;
    }
}
foreach (getRange(1000000) as $number) {
    echo $number;
}`,
    options: [
      'To pause function execution',
      'To create generator functions',
      'To handle errors gracefully',
      'To optimize loops'
    ],
    correctAnswer: 1,
    explanation: 'yield creates a generator function that returns an Iterator object. Benefits: 1) Memory efficient - values generated one at a time, not stored in array, 2) Perfect for large datasets, 3) Can pause and resume execution. In the example, instead of creating a million-element array, it generates values on demand.',
    hint: 'Think about memory usage when working with large datasets.'
  },
  {
    id: 51,
    category: 'MySQL',
    difficulty: 'Easy',
    question: 'What is the purpose of the LIKE operator in MySQL?',
    code: `SELECT * FROM users 
WHERE email LIKE '%@gmail.com';`,
    options: [
      'For exact string matching',
      'For pattern matching',
      'For numeric comparisons',
      'For NULL checking'
    ],
    correctAnswer: 1,
    explanation: 'LIKE performs pattern matching using wildcards: % (matches any number of characters) and _ (matches exactly one character). Common uses: 1) Finding emails from specific domains, 2) Searching for partial names, 3) Finding patterns in text. Note: LIKE with leading wildcard (%) can\'t use indexes effectively.',
    hint: 'Think about how you would search for partial matches in text.'
  },
  {
    id: 52,
    category: 'PHP',
    difficulty: 'Hard',
    question: 'What is the difference between PDO and MySQLi in PHP?',
    code: `// PDO
$pdo = new PDO("mysql:host=localhost;dbname=test", $user, $pass);
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");

// MySQLi
$mysqli = new mysqli("localhost", $user, $pass, "test");
$stmt = $mysqli->prepare("SELECT * FROM users WHERE id = ?");`,
    options: [
      'PDO supports more databases',
      'MySQLi has better performance',
      'PDO is newer technology',
      'MySQLi is more secure'
    ],
    correctAnswer: 0,
    explanation: 'Key differences: 1) PDO supports multiple database types, MySQLi only MySQL, 2) PDO offers a consistent interface across databases, 3) Both support prepared statements and are equally secure, 4) PDO has more features like error handling modes and attribute settings. Choose PDO for database-agnostic code, MySQLi for MySQL-specific features.',
    hint: 'Consider which might be better if you need to switch database systems later.'
  },
  {
    id: 53,
    category: 'MySQL',
    difficulty: 'Medium',
    question: 'What is a stored procedure and when should it be used?',
    code: `DELIMITER //
CREATE PROCEDURE GetUserOrders(IN userId INT)
BEGIN
    SELECT * FROM orders 
    WHERE user_id = userId;
END //
DELIMITER ;

CALL GetUserOrders(123);`,
    options: [
      'A saved query template',
      'A precompiled SQL routine',
      'A table backup method',
      'A data validation rule'
    ],
    correctAnswer: 1,
    explanation: 'A stored procedure is a precompiled collection of SQL statements stored in the database. Benefits: 1) Better performance as procedures are pre-compiled, 2) Reduced network traffic, 3) Centralized business logic, 4) Enhanced security through granular permissions. Use when logic needs to be reused or when reducing network traffic is important.',
    hint: 'Think about reusable SQL code that runs on the database server.'
  },
  {
    id: 54,
    category: 'PHP',
    difficulty: 'Easy',
    question: 'What is the purpose of the PHP header() function?',
    code: `header('Location: dashboard.php');
header('Content-Type: application/json');
header('Cache-Control: no-cache');`,
    options: [
      'To create HTML headers',
      'To send HTTP headers',
      'To format page layout',
      'To include file headers'
    ],
    correctAnswer: 1,
    explanation: 'header() sends raw HTTP headers to the client. Common uses: 1) Redirecting users to different pages, 2) Specifying content types, 3) Setting cookies, 4) Controlling caching behavior. Important: Must be called before any actual output is sent to the browser (including HTML and whitespace).',
    hint: 'Think about communication between server and browser before content is sent.'
  },
  {
    id: 55,
    category: 'MySQL',
    difficulty: 'Hard',
    question: 'What is database normalization and why is it important?',
    code: `-- Unnormalized
CREATE TABLE orders (
    id INT,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    product_name VARCHAR(100),
    product_price DECIMAL(10,2)
);

-- Normalized
CREATE TABLE customers (
    id INT,
    name VARCHAR(100),
    email VARCHAR(100)
);
CREATE TABLE products (
    id INT,
    name VARCHAR(100),
    price DECIMAL(10,2)
);
CREATE TABLE orders (
    id INT,
    customer_id INT,
    product_id INT
);`,
    options: [
      'A way to compress data',
      'A database design process',
      'A backup strategy',
      'A query optimization method'
    ],
    correctAnswer: 1,
    explanation: 'Normalization is a database design technique that reduces data redundancy and dependency by organizing fields and tables. Benefits: 1) Eliminates redundant data, 2) Ensures data consistency, 3) Reduces update anomalies, 4) Makes the database more flexible for future changes. Common forms are 1NF, 2NF, and 3NF, each addressing specific types of dependencies.',
    hint: 'Think about organizing data to minimize redundancy and maintain consistency.'
  },
  {
    id: 75,
    category: 'PHP',
    difficulty: 'Medium',
    question: 'What is the MVC pattern and why is it used in PHP applications?',
    code: `// Model
class UserModel {
    public function getUser($id) { /* ... */ }
}

// Controller
class UserController {
    public function show($id) {
        $user = new UserModel()->getUser($id);
        require 'view/user.php';
    }
}

// View
<h1><?php echo $user->name; ?></h1>`,
    options: [
      'A file organization system',
      'A design pattern for separation of concerns',
      'A database management pattern',
      'A security implementation'
    ],
    correctAnswer: 1,
    explanation: 'MVC (Model-View-Controller) separates application logic into three components: 1) Model: handles data and business logic, 2) View: handles presentation and UI, 3) Controller: handles user input and coordinates Model and View. Benefits include better organization, code reuse, and easier maintenance.',
    hint: 'Think about how to separate different aspects of an application.'
  },
  // JavaScript Questions (IDs 101-115)
  {
    id: 101,
    category: 'JavaScript',
    difficulty: 'Easy',
    question: 'What is the difference between let and var in JavaScript?',
    options: [
      'They are completely identical',
      'let has block scope, var has function scope',
      'var is not supported in modern JavaScript',
      'let cannot be reassigned'
    ],
    correctAnswer: 1,
    explanation: 'let and var differ in their scoping rules: 1) let is block-scoped, meaning it only exists within the nearest { } block, 2) var is function-scoped and can be accessed throughout the function, 3) var variables are hoisted and initialized as undefined, while let variables are hoisted but not initialized (temporal dead zone), 4) var allows redeclaration, let does not.',
    hint: 'Think about where these variables can be accessed from within your code.'
  },
  // Python Questions (IDs 201-215)
  {
    id: 201,
    category: 'Python',
    difficulty: 'Easy',
    question: 'What is the difference between a list and a tuple in Python?',
    code: `# List
my_list = [1, 2, 3]
my_list[0] = 4  # Valid

# Tuple
my_tuple = (1, 2, 3)
my_tuple[0] = 4  # TypeError: 'tuple' object does not support item assignment`,
    options: [
      'No difference between them',
      'Lists are mutable, tuples are immutable',
      'Lists are faster than tuples',
      'Tuples can store more items'
    ],
    correctAnswer: 1,
    explanation: 'Key differences: 1) Lists are mutable (can be modified), tuples are immutable (cannot be modified), 2) Lists use square brackets [], tuples use parentheses (), 3) Tuples are slightly more memory efficient, 4) Tuples are commonly used for heterogeneous data, lists for homogeneous data.',
    hint: 'Think about which one allows you to change its contents after creation.'
  },
  {
    id: 202,
    category: 'Python',
    difficulty: 'Easy',
    question: 'What is the purpose of the if __name__ == "__main__": statement?',
    code: `def main():
    print("Running directly")

if __name__ == "__main__":
    main()`,
    options: [
      'To define the main function',
      'To check how the file is run',
      'To import other modules',
      'To set program name'
    ],
    correctAnswer: 1,
    explanation: 'This statement checks whether the Python file is being run directly or being imported as a module. When a Python file is run directly, __name__ is set to "__main__". When imported as a module, __name__ is set to the module\'s name. This allows code to behave differently when run directly versus being imported.',
    hint: 'Consider how Python files can be both run directly and imported as modules.'
  },
  {
    id: 203,
    category: 'Python',
    difficulty: 'Easy',
    question: 'What are list comprehensions in Python?',
    code: `# Traditional way
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension
squares = [x**2 for x in range(10)]`,
    options: [
      'Ways to sort lists',
      'Concise way to create lists',
      'List documentation',
      'List validation methods'
    ],
    correctAnswer: 1,
    explanation: 'List comprehensions provide a concise way to create lists based on existing lists or iterables. Benefits: 1) More readable and compact syntax, 2) Often faster than traditional for loops, 3) Can include conditions and nested loops, 4) Can be used with any iterable (lists, strings, ranges, etc.).',
    hint: 'Think about a shorter way to write loops that create lists.'
  },
  {
    id: 204,
    category: 'Python',
    difficulty: 'Easy',
    question: 'What is the difference between == and is in Python?',
    code: `a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)  # True (same value)
print(a is b)  # False (different objects)
print(a is c)  # True (same object)`,
    options: [
      'They are identical',
      'One checks value, one checks identity',
      'One is faster',
      'One is deprecated'
    ],
    correctAnswer: 1,
    explanation: '== checks if two objects have the same value, while is checks if they are the same object in memory. Key points: 1) is compares object identity (memory address), 2) == compares object value, 3) is is faster but should mainly be used for None comparisons, 4) Small integers and strings may be interned, giving unexpected is results.',
    hint: 'Consider whether you want to check if two variables refer to the same object or just have the same value.'
  },
  {
    id: 205,
    category: 'Python',
    difficulty: 'Easy',
    question: 'What is the purpose of the with statement in Python?',
    code: `# Without with statement
f = open('file.txt', 'r')
content = f.read()
f.close()

# With with statement
with open('file.txt', 'r') as f:
    content = f.read()`,
    options: [
      'To create loops',
      'To handle resources safely',
      'To define functions',
      'To catch exceptions'
    ],
    correctAnswer: 1,
    explanation: 'The with statement provides a clean way to handle resource management. Benefits: 1) Automatically handles cleanup (like closing files), 2) Works with any context manager object, 3) Ensures resources are properly released even if exceptions occur, 4) More readable and less error-prone than try/finally blocks.',
    hint: 'Think about safely managing resources that need to be cleaned up after use.'
  },
  // React Questions (IDs 301-315)
  {
    id: 301,
    category: 'React',
    difficulty: 'Easy',
    question: 'What is JSX in React?',
    code: `function Welcome() {
  return (
    <div className="greeting">
      <h1>Hello, World!</h1>
    </div>
  );
}`,
    options: [
      'A JavaScript engine',
      'A template language',
      'JavaScript XML syntax extension',
      'A build tool'
    ],
    correctAnswer: 2,
    explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript. Key points: 1) Allows mixing HTML with JavaScript logic, 2) Gets transformed into regular JavaScript function calls during build, 3) Makes component code more readable and maintainable, 4) Helps prevent XSS by escaping values by default.',
    hint: 'Think about how React lets you write HTML-like code in JavaScript.'
  },
  {
    id: 302,
    category: 'React',
    difficulty: 'Easy',
    question: 'What is the purpose of useState in React?',
    code: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    options: [
      'To create global state',
      'To manage component state',
      'To handle routing',
      'To optimize rendering'
    ],
    correctAnswer: 1,
    explanation: 'useState is a React Hook that lets you add state to functional components. Features: 1) Returns current state and setter function, 2) Component re-renders when state changes, 3) State persists between renders, 4) Each useState call creates an independent state variable.',
    hint: 'Consider how components remember and update their data over time.'
  },
  {
    id: 303,
    category: 'React',
    difficulty: 'Easy',
    question: 'What are props in React?',
    code: `function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

<Welcome name="Alice" />`,
    options: [
      'Internal component state',
      'Data passed to components',
      'Styling properties',
      'Event handlers'
    ],
    correctAnswer: 1,
    explanation: 'Props are read-only data passed to React components. Key concepts: 1) Props flow down from parent to child components, 2) Props are immutable - components cannot modify their props, 3) Props can be any JavaScript value (strings, numbers, objects, functions), 4) Props help create reusable components.',
    hint: 'Think about how components receive and use data from their parent components.'
  },
  {
    id: 304,
    category: 'React',
    difficulty: 'Easy',
    question: 'What is the virtual DOM in React?',
    options: [
      'A copy of the browser DOM',
      'A lightweight DOM representation',
      'A JavaScript engine',
      'A browser extension'
    ],
    correctAnswer: 1,
    explanation: 'The virtual DOM is a lightweight copy of the real DOM in memory. Process: 1) React creates virtual DOM when state changes, 2) Compares virtual DOM with previous version, 3) Calculates minimal needed changes, 4) Updates real DOM only where necessary. This makes React\'s rendering process more efficient.',
    hint: 'Consider how React optimizes DOM updates to improve performance.'
  },
  {
    id: 305,
    category: 'React',
    difficulty: 'Easy',
    question: 'What is the purpose of the key prop in React lists?',
    code: `function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}`,
    options: [
      'For styling elements',
      'For unique identification',
      'For sorting items',
      'For event handling'
    ],
    correctAnswer: 1,
    explanation: 'The key prop helps React identify which items have changed in a list. Important points: 1) Must be unique among siblings, 2) Helps React optimize rendering of lists, 3) Should be stable across re-renders, 4) Don\'t use array index as key unless list is static.',
    hint: 'Think about how React tracks individual items in a list of elements.'
  },
  {
    id: 306,
    category: 'React',
    difficulty: 'Medium',
    question: 'What are React hooks and why were they introduced?',
    code: `function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>Click me</button>;
}`,
    options: [
      'Class component features',
      'State in function components',
      'Performance optimizations',
      'Routing solutions'
    ],
    correctAnswer: 1,
    explanation: 'Hooks allow using state and other React features in function components. Benefits: 1) Reuse stateful logic between components, 2) Split complex components into smaller functions, 3) Use React features without classes, 4) Better code organization. Common hooks include useState, useEffect, useContext, etc.',
    hint: 'Consider how function components can use features previously only available in class components.'
  },
  {
    id: 307,
    category: 'React',
    difficulty: 'Medium',
    question: 'What is the useEffect hook used for?',
    code: `useEffect(() => {
  // Subscribe to service
  return () => {
    // Cleanup subscription
  };
}, [dependency]);`,
    options: [
      'State management',
      'Side effects handling',
      'Event handling',
      'Component styling'
    ],
    correctAnswer: 1,
    explanation: 'useEffect handles side effects in function components. Use cases: 1) Data fetching, 2) Subscriptions, 3) DOM manipulation, 4) Cleanup operations. The dependency array controls when the effect runs, and the cleanup function prevents memory leaks.',
    hint: 'Think about operations that need to happen after rendering or need cleanup.'
  },
  {
    id: 308,
    category: 'React',
    difficulty: 'Medium',
    question: 'What is the Context API in React?',
    code: `const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}`,
    options: [
      'Global state management',
      'Prop drilling solution',
      'Routing system',
      'Data fetching tool'
    ],
    correctAnswer: 1,
    explanation: 'Context provides a way to pass data through the component tree without manually passing props. Uses: 1) Sharing global data (theme, user preferences), 2) Avoiding prop drilling, 3) Providing configuration to deeply nested components, 4) Managing application-wide state.',
    hint: 'Consider how to share data with distant components without passing props through every level.'
  },
  {
    id: 309,
    category: 'React',
    difficulty: 'Medium',
    question: 'What is prop drilling and how can it be avoided?',
    code: `// Prop Drilling
function GrandParent({ user }) {
  return <Parent user={user} />;
}
function Parent({ user }) {
  return <Child user={user} />;
}
function Child({ user }) {
  return <div>{user.name}</div>;
}

// Solution with Context
const UserContext = React.createContext();
function GrandParent({ user }) {
  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}`,
    options: [
      'Using more components',
      'Using Context or state management',
      'Reducing props',
      'Using class components'
    ],
    correctAnswer: 1,
    explanation: 'Prop drilling occurs when props are passed through components that don\'t need them. Solutions: 1) React Context for global state, 2) State management libraries (Redux, MobX), 3) Component composition, 4) Render props pattern. Choose based on scale and complexity of data sharing needs.',
    hint: 'Think about alternatives to passing props through multiple levels of components.'
  },
  {
    id: 310,
    category: 'React',
    difficulty: 'Medium',
    question: 'What is the purpose of React.memo?',
    code: `const MemoizedComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
}, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});`,
    options: [
      'Memory management',
      'Performance optimization',
      'Error handling',
      'State management'
    ],
    correctAnswer: 1,
    explanation: 'React.memo is a higher-order component for performance optimization. Features: 1) Memoizes component renders, 2) Skips rendering if props haven\'t changed, 3) Can provide custom comparison function, 4) Useful for expensive computations or renders. Use when component renders often with same props.',
    hint: 'Consider how to prevent unnecessary re-renders of components.'
  },
  {
    id: 311,
    category: 'React',
    difficulty: 'Hard',
    question: 'What are React Fiber and reconciliation?',
    code: `// React internally handles updates
setState(newState);
// Fiber breaks work into units
// and can pause/resume rendering`,
    options: [
      'Build tools',
      'React\'s core algorithm',
      'Testing utilities',
      'State management'
    ],
    correctAnswer: 1,
    explanation: 'React Fiber is React\'s reconciliation engine. Features: 1) Breaks rendering work into chunks, 2) Can pause and resume work, 3) Assigns priority to different types of updates, 4) Enables features like concurrent mode. This makes React apps more responsive by not blocking the main thread.',
    hint: 'Think about how React schedules and processes updates internally.'
  },
  {
    id: 312,
    category: 'React',
    difficulty: 'Hard',
    question: 'What are React error boundaries?',
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`,
    options: [
      'Regular try-catch blocks',
      'Component error handlers',
      'Testing utilities',
      'Debug tools'
    ],
    correctAnswer: 1,
    explanation: 'Error boundaries are components that catch JavaScript errors in child components. Features: 1) Prevent entire app from crashing, 2) Can log errors to error reporting services, 3) Show fallback UI, 4) Must be class components. They don\'t catch errors in event handlers, async code, or their own errors.',
    hint: 'Consider how to handle errors in React components gracefully.'
  },
  {
    id: 313,
    category: 'React',
    difficulty: 'Hard',
    question: 'What is the useReducer hook and when should it be used?',
    code: `const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}`,
    options: [
      'Simple state updates',
      'Complex state logic',
      'API calls handling',
      'Component lifecycle'
    ],
    correctAnswer: 1,
    explanation: 'useReducer manages complex state logic in components. Use cases: 1) State updates depend on multiple factors, 2) Related state updates should be handled together, 3) Complex state shape with nested data, 4) When state logic should be tested independently. Similar to Redux\'s pattern but for component-level state.',
    hint: 'Think about when useState becomes too complicated for state management.'
  },
  {
    id: 314,
    category: 'React',
    difficulty: 'Hard',
    question: 'What are React\'s Suspense and lazy loading?',
    code: `const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<Loading />}>
      <OtherComponent />
    </Suspense>
  );
}`,
    options: [
      'Error handling',
      'Code splitting features',
      'State management',
      'Testing utilities'
    ],
    correctAnswer: 1,
    explanation: 'Suspense enables lazy loading of components and data. Benefits: 1) Code splitting - load components on demand, 2) Reduce initial bundle size, 3) Show loading states while content loads, 4) Handle async dependencies gracefully. Future versions will support data fetching with Suspense.',
    hint: 'Consider how to load parts of your application only when they\'re needed.'
  },
  {
    id: 315,
    category: 'React',
    difficulty: 'Hard',
    question: 'What are React portals and when should they be used?',
    code: `function Modal({ children }) {
  return ReactDOM.createPortal(
    children,
    document.getElementById('modal-root')
  );
}

function App() {
  return (
    <div>
      <h1>App Content</h1>
      <Modal>
        <h2>Modal Content</h2>
      </Modal>
    </div>
  );
}`,
    options: [
      'Component communication',
      'DOM node rendering',
      'State management',
      'Event handling'
    ],
    correctAnswer: 1,
    explanation: 'Portals render children into a DOM node outside their parent component\'s hierarchy. Use cases: 1) Modals and dialogs, 2) Tooltips and popovers, 3) Floating menus, 4) Widgets that need to break out of container CSS. Events still bubble up through React\'s tree regardless of portal location.',
    hint: 'Think about when components need to render outside their parent\'s DOM hierarchy.'
  }
]; 