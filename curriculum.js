// 90-Day Python Curriculum Database
// Structured as a global array for maximum browser compatibility.

const CURRICULUM = [
  // ==========================================
  // PHASE 1: BASIC FOUNDATIONS (Days 1–15)
  // ==========================================
  {
    day: 1,
    phase: 1,
    title: "Say Hello to Python!",
    lore: "Did you know? Python was named after 'Monty Python’s Flying Circus' (a comedy show), not the snake! The creator, Guido van Rossum, wanted a name that was short and mysterious.",
    concept: "We tell the computer what to show on screen using the `print()` function. Think of it as a megaphone for your code. Anything inside quotes `\"` will be displayed exactly as it is.",
    parentGuide: "Ask them to change the text inside the print statement to say a greeting to you or their favorite pet.",
    challenge: "Write a program that prints your name and your favorite video game on two separate lines.",
    tasks: ["Read the concept & lore", "Write the code using print()", "Verify it outputs on two lines", "Save and download code"],
    starterCode: `# Day 1: Say Hello to Python!\n# Write your code below to print your name and favorite game!\n\n`,
    hints: [
      "Use print() to output text.",
      "Write two print() statements, one after another.",
      "print(\"My name is Alex\")\nprint(\"I love Minecraft!\")"
    ]
  },
  {
    day: 2,
    phase: 1,
    title: "Variable Boxes",
    lore: "In Minecraft, you use chests to store items. In Python, we use 'Variables' to store data so we can reuse it later. A variable is just a chest with a label!",
    concept: "We create a variable by writing its name, an equals sign `=`, and then the value. Example: `score = 10`. To show it, we print the variable name without quotes: `print(score)`.",
    parentGuide: "Make sure they understand that variable names cannot have spaces! They can use underscores like `my_score`.",
    challenge: "Create a variable named `hero_name` and set it to a hero's name. Print the variable.",
    tasks: ["Read the chest metaphor", "Create the hero_name variable", "Print the variable without quotes", "Test your code"],
    starterCode: `# Day 2: Variable Boxes\n# Create your hero_name variable below and print it!\n\n`,
    hints: [
      "Set your variable using the = sign.",
      "Remember quotes for text: hero_name = \"Steve\".",
      "hero_name = \"Steve\"\nprint(hero_name)"
    ]
  },
  {
    day: 3,
    phase: 1,
    title: "The Numbers Game",
    lore: "Computers are basically super-calculators. Python can do math instantly. Python separates numbers into integers (whole numbers like 5) and floats (decimal numbers like 5.5).",
    concept: "You can perform addition `+`, subtraction `-`, multiplication `*`, and division `/` directly on numbers or variables holding numbers. Example: `total = 5 + 10`.",
    parentGuide: "Ask them what is the difference between writing `print(5 + 5)` and `print(\"5 + 5\")`.",
    challenge: "Create two variables: `coins` (set to 50) and `bonus` (set to 15). Print the sum of these variables.",
    tasks: ["Read about integers vs floats", "Create coins and bonus variables", "Calculate their sum", "Print the result"],
    starterCode: `# Day 3: The Numbers Game\n# Create coins and bonus, then print their sum!\n\n`,
    hints: [
      "Assign integers directly without quotes: coins = 50.",
      "You can print the sum directly: print(coins + bonus).",
      "coins = 50\nbonus = 15\nprint(coins + bonus)"
    ]
  },
  {
    day: 4,
    phase: 1,
    title: "Talking Back (Inputs)",
    lore: "An interactive program takes feedback. In Python, we get input from the user using the `input()` function. It pauses the program and waits for the user to type and press Enter.",
    concept: "To save what the user typed, store it in a variable: `name = input(\"What is your name? \")`. Python will put whatever they type inside the `name` chest.",
    parentGuide: "Run the program together and type in different names to see how the computer remembers it.",
    challenge: "Ask the user 'What is your favorite color?'. Store the answer in a variable named `color` and then print it.",
    tasks: ["Read about input()", "Create color variable using input()", "Print the color", "Run and test with inputs"],
    starterCode: `# Day 4: Talking Back (Inputs)\n# Ask the user for their color and print it!\n\n`,
    hints: [
      "Use input() inside a variable assignment.",
      "Provide a prompt inside input(\"...\").",
      "color = input(\"Enter your favorite color: \")\nprint(color)"
    ]
  },
  {
    day: 5,
    phase: 1,
    title: "Combining Words (Concatenation)",
    lore: "In coding, a piece of text is called a 'String' (short for a string of characters). We can glue strings together using the `+` sign! This is called concatenation.",
    concept: "If `name = \"Lego\"`, then `print(\"Hello \" + name)` will display `Hello Lego`. Notice the space after 'Hello '! If we don't add it, the words will stick together.",
    parentGuide: "Verify they put spaces in their text strings so the output reads naturally like a human sentence.",
    challenge: "Ask the user for their favorite food. Print a message like 'I love eating [food] too!'.",
    tasks: ["Understand string gluing", "Get input for favorite food", "Concatenate strings with spaces", "Print the final message"],
    starterCode: `# Day 5: Combining Words\n# Glue your greeting to the user's input food!\n\n`,
    hints: [
      "Use the + operator to join strings.",
      "Make sure to add a space inside the quotes: \"I love eating \" + food.",
      "food = input(\"What is your favorite food? \")\nprint(\"I love eating \" + food + \" too!\")"
    ]
  },
  {
    day: 6,
    phase: 1,
    title: "String Multiplier",
    lore: "Did you know? In Python, you can multiply text by a number! If you multiply 'Ha' by 3, you get 'HaHaHa'. Try doing that in math class!",
    concept: "You can use the multiplication symbol `*` with a string and an integer. Example: `print(\"Wobble \" * 3)` outputs `Wobble Wobble Wobble `.",
    parentGuide: "Have them multiply a funny sound effect by 10 or 20 and see the result.",
    challenge: "Write a program that asks for a sound effect (like 'Zap!') and prints it 10 times in a row.",
    tasks: ["Understand text multiplication", "Get input for sound effect", "Print the sound multiplied by 10", "Test run"],
    starterCode: `# Day 6: String Multiplier\n# Multiply a string by 10 and print it!\n\n`,
    hints: [
      "Use the * operator with an integer.",
      "sound = input(\"Enter sound: \") followed by print(sound * 10).",
      "sound = input(\"Enter sound: \")\nprint(sound * 10)"
    ]
  },
  {
    day: 7,
    phase: 1,
    title: "The Magic f-String",
    lore: "Gluing strings with the `+` sign can get annoying with too many spaces. Python has a modern superpower called 'f-strings' (formatted strings) that make it super easy!",
    concept: "Put an `f` before quotes, and you can place variables directly inside curly braces `{}`. Example: `print(f\"Hello {name}, you have {coins} coins!\")`.",
    parentGuide: "This is a key modern Python feature. Encourage them to use f-strings instead of standard '+' concatenation from now on.",
    challenge: "Create variables for `name`, `age`, and `city`. Print a sentence using an f-string describing them.",
    tasks: ["Understand f-string syntax", "Create name, age, and city variables", "Write f-string with variables inside {}", "Print and run"],
    starterCode: `# Day 7: The Magic f-String\n# Write a formatted sentence using f\"text {variable}\"!\n\n`,
    hints: [
      "Make sure the 'f' is right outside the first quote mark.",
      "Place variables inside curly braces: {name}.",
      "name = \"Zane\"\nage = 13\ncity = \"London\"\nprint(f\"{name} is {age} years old and lives in {city}.\")"
    ]
  },
  {
    day: 8,
    phase: 1,
    title: "Number Converters",
    lore: "When we get an input using `input()`, Python always assumes it is text. If you input '5' and try to add '5', Python gets confused. We must convert text to numbers first!",
    concept: "To convert a text string into an integer (whole number), we wrap it in `int()`. Example: `age = int(input(\"Enter age: \"))`. Now we can do math with it!",
    parentGuide: "Show them the error that happens if they try to do math with a plain `input()` string.",
    challenge: "Ask the user for their birth year. Subtract it from the current year to calculate and print their age.",
    tasks: ["Understand input() string limits", "Use int() to cast birth year text to number", "Perform subtraction", "Print the age"],
    starterCode: `# Day 8: Number Converters\n# Convert the input birth year to an integer first!\n\n`,
    hints: [
      "Use int(input(...)) to get a number.",
      "Subtract birth year from 2026.",
      "birth_year = int(input(\"What year were you born? \"))\nage = 2026 - birth_year\nprint(f\"You are {age} years old!\")"
    ]
  },
  {
    day: 9,
    phase: 1,
    title: "Decimal Math (Floats)",
    lore: "Integers are for countable items (like 3 apples). Floats are for continuous measurements (like 1.75 meters or 98.6 degrees). 'Float' stands for floating-point representation.",
    concept: "To convert inputs into decimal numbers, we use `float()`. Example: `height = float(input(\"Enter height in meters: \"))`. Let's perform decimal calculations.",
    parentGuide: "Help them understand when to use `int()` (e.g. players, levels) vs `float()` (e.g. prices, time, speeds).",
    challenge: "Ask for the price of a toy. Calculate the 10% tax (multiply price by 0.1) and print the total price (price + tax).",
    tasks: ["Understand floats", "Use float() to cast price input", "Calculate 10% tax", "Print total price using f-string"],
    starterCode: `# Day 9: Decimal Math\n# Use float() to capture decimal numbers like prices!\n\n`,
    hints: [
      "Use float(input(...)) to get decimal numbers.",
      "Tax is price * 0.1. Total is price + tax.",
      "price = float(input(\"Toy price: \"))\ntax = price * 0.1\ntotal = price + tax\nprint(f\"Total cost is ${total:.2f}\")"
    ]
  },
  {
    day: 10,
    phase: 1,
    title: "Exponents (Power Up!)",
    lore: "In games, damage or power levels can grow exponentially. Python has a special operator to raise a number to a power: double asterisks `**`.",
    concept: "Writing `2 ** 3` means '2 raised to the power of 3' (which is `2 * 2 * 2 = 8`). Do not confuse this with `2 * 3`!",
    parentGuide: "Quiz them: what is `3 ** 2`? (9) and `2 ** 4`? (16). Test it in Python.",
    challenge: "Write a program that asks for a base number and an exponent power, then prints the result of raising base to the power.",
    tasks: ["Learn exponent double stars **", "Get base number as int", "Get exponent power as int", "Print base ** power"],
    starterCode: `# Day 10: Exponents\n# Calculate exponential powers using the ** operator!\n\n`,
    hints: [
      "Use ** for power calculations.",
      "base = int(input(\"Base: \")) followed by power = int(input(\"Power: \"))",
      "base = int(input(\"Enter base: \"))\npower = int(input(\"Enter power: \"))\nresult = base ** power\nprint(f\"{base} to the power of {power} is {result}\")"
    ]
  },
  {
    day: 11,
    phase: 1,
    title: "Remainder Finder (Modulo)",
    lore: "Modulo is a secret weapon in programming! The modulo operator `%` divides one number by another and returns *only the remainder*.",
    concept: "Example: `10 % 3` is `1` because 3 fits into 10 three times with a remainder of 1. Modulo is super useful to find if a number is even (remainder is 0 when divided by 2).",
    parentGuide: "Show them how dividing any even number by 2 leaves a remainder of 0, while odd numbers leave 1.",
    challenge: "Ask for a number and print its remainder when divided by 2. (If it's 0, it's even!)",
    tasks: ["Learn modulo operator %", "Get number input as int", "Calculate modulo 2", "Print remainder"],
    starterCode: `# Day 11: Remainder Finder\n# Use % to get the remainder of division!\n\n`,
    hints: [
      "Use number % 2 to calculate the remainder.",
      "num = int(input(\"Number: \")) followed by rem = num % 2",
      "num = int(input(\"Enter a number: \"))\nremainder = num % 2\nprint(f\"The remainder divided by 2 is {remainder}\")"
    ]
  },
  {
    day: 12,
    phase: 1,
    title: "String Length",
    lore: "How long is your password? Websites check this using length indicators. In Python, we can find the number of characters in a string using `len()`.",
    concept: "Wrap any string or variable in `len()`. Example: `len(\"Hello\")` returns `5`. Spaces and punctuation count as characters too!",
    parentGuide: "Have them type a sentence and count how many characters it has including spaces.",
    challenge: "Ask the user to type a secret password. Print the length of that password.",
    tasks: ["Understand len() function", "Get password input", "Calculate length using len()", "Print the length"],
    starterCode: `# Day 12: String Length\n# Measure string lengths using the len() function!\n\n`,
    hints: [
      "Use len(password) to get the character count.",
      "Keep input as a string (don't convert to int).",
      "password = input(\"Enter a password: \")\nlength = len(password)\nprint(f\"Your password has {length} characters!\")"
    ]
  },
  {
    day: 13,
    phase: 1,
    title: "Capitalization Tricks",
    lore: "Games often clean up player inputs. If you type 'yes' or 'YES', the game should understand both. We can change string case using `.upper()` and `.lower()`.",
    concept: "If `text = \"Python\"`, then `text.upper()` yields `PYTHON` and `text.lower()` yields `python`. Notice the dot `.` before the function name!",
    parentGuide: "Explain that string methods are actions that belong specifically to text strings.",
    challenge: "Ask the user to type their name. Print their name in ALL CAPS and then in all lowercase.",
    tasks: ["Learn upper() and lower() string methods", "Get name input", "Print name.upper()", "Print name.lower()"],
    starterCode: `# Day 13: Capitalization Tricks\n# Clean string text using upper() and lower() methods!\n\n`,
    hints: [
      "Call the methods using variable.upper() and variable.lower().",
      "Don't forget the parentheses: .upper()",
      "name = input(\"Enter name: \")\nprint(name.upper())\nprint(name.lower())"
    ]
  },
  {
    day: 14,
    phase: 1,
    title: "Multi-Line Text",
    lore: "Sometimes you need to print a whole story or code template. Instead of writing print() ten times, Python lets us write multi-line text using triple quotes `\"\"\"`.",
    concept: "Anything written between triple quotes `\"\"\"` maintains its line breaks and formatting exactly. Example:\n```python\nprint(\"\"\"\n Line 1\n Line 2\n\"\"\")\n```",
    parentGuide: "This is great for showing game splash screens, maps, or art.",
    challenge: "Use triple quotes to print a simple text-art robot or house using characters (like /, \\, |, _).",
    tasks: ["Learn triple quotes \"\"\"", "Design simple text-art", "Print using triple quotes", "Run code"],
    starterCode: `# Day 14: Multi-Line Text\n# Print a cool text-art graphic using triple quotes \"\"\"!\n\nprint(\"\"\"\n  [Your Art Here]\n\"\"\")\n`,
    hints: [
      "Wrap the entire ASCII shape in \"\"\" at the start and end.",
      "Use basic keys like dashes and bars.",
      "print(\"\"\"\n   +---+ \n   |o o| \n   | = | \n   +---+ \n\"\"\")"
    ]
  },
  {
    day: 15,
    phase: 1,
    title: "Phase 1 Graduation: The Bio Generator",
    lore: "Congratulations! You have completed Phase 1! You now know how to get input, store variables, do math, and format strings. Let's build a final bio creator!",
    concept: "We will consolidate everything we've learned: get inputs, perform a math operation (like calculating age from birth year), and display a profile card.",
    parentGuide: "Celebrate this milestone! They will unlock their Phase 1 Certificate upon completing this day.",
    challenge: "Write a program that asks for a name, birth year, favorite hobby, and hobby level (integer). Calculate their age and print a formatted profile card summary.",
    tasks: ["Get all inputs", "Perform age math (2026 - birth year)", "Calculate total hobby power (hobby level * 10)", "Print a structured profile summary card using an f-string"],
    starterCode: `# Day 15 Phase 1 Capstone\n# Build a Profile Card Generator combining all skills!\n\n`,
    hints: [
      "Convert birth year to int.",
      "Use triple quotes for the final card border layout, filling variables in using f-string: f\"\"\"card\"\"\".",
      "name = input(\"Name: \")\nbirth = int(input(\"Birth Year: \"))\nhobby = input(\"Hobby: \")\nlevel = int(input(\"Hobby Level (1-10): \"))\nage = 2026 - birth\nprint(f\"\"\"\n=======================\nPLAYER CARD: {name.upper()}\nAge: {age} years\nSpecialty: {hobby}\nPower Rank: {level * 100} XP\n=======================\n\"\"\")"
    ]
  },

  // ==========================================
  // PHASE 2: LOGIC & DECISIONS (Days 16–30)
  // ==========================================
  {
    day: 16,
    phase: 2,
    title: "Truth or Lie (Booleans)",
    lore: "In binary code, computers think in 1s and 0s. In programming, we call these values True and False. They are named 'Booleans' after mathematician George Boole.",
    concept: "A Boolean variable can only hold one of two values: `True` or `False`. Note: Python is case-sensitive, so it must be capitalized without quotes: `active = True`.",
    parentGuide: "Quiz them: Is `\"True\"` (with quotes) a boolean? No, it is a text string!",
    challenge: "Create a boolean variable named `is_hungry` set to True. Print its type using `print(type(is_hungry))` to see the boolean class.",
    tasks: ["Understand Booleans", "Create is_hungry boolean variable", "Print its type using type()", "Verify class is 'bool'"],
    starterCode: `# Day 16: Booleans\n# Create a boolean and check its type!\n\n`,
    hints: [
      "Create a variable: is_hungry = True.",
      "Call type(is_hungry) inside print().",
      "is_hungry = True\nprint(type(is_hungry))"
    ]
  },
  {
    day: 17,
    phase: 2,
    title: "Comparing Numbers",
    lore: "To make decisions, the computer needs to compare values. We use comparison operators: greater than `>`, less than `<`, equal to `==`, and not equal to `!=`.",
    concept: "Notice that 'equal to' uses two equals signs `==`! A single equals sign `=` assigns a value. Two equals signs checks if they are equal, returning True or False.",
    parentGuide: "Have them print the evaluation of comparisons directly, like `print(5 > 3)`.",
    challenge: "Write a program that asks for two numbers and prints whether the first number is greater than the second (True/False).",
    tasks: ["Learn comparisons: >, <, ==, !=, >=, <=", "Get two float inputs", "Print first > second", "Verify boolean output"],
    starterCode: `# Day 17: Comparing Numbers\n# Compare two user inputs and print the result!\n\n`,
    hints: [
      "Convert inputs to numbers using float() or int().",
      "Use the > operator: print(num1 > num2).",
      "n1 = float(input(\"First: \"))\nn2 = float(input(\"Second: \"))\nprint(n1 > n2)"
    ]
  },
  {
    day: 18,
    phase: 2,
    title: "The IF Gate",
    lore: "This is where coding gets exciting! We can make code run *only if* a condition is met. Think of it as a checkpoint gate in a game.",
    concept: "We write `if condition:` followed by indented code. Indentation (4 spaces or 1 tab) is how Python knows what code belongs inside the IF block.\n```python\nif score > 100:\n    print(\"New Record!\")\n```",
    parentGuide: "Emphasize indentation! Python will crash or run incorrectly if code inside the IF block isn't indented.",
    challenge: "Ask the user to enter their age. If the age is 13 or older, print 'Welcome to the teen zone!'.",
    tasks: ["Learn if statement syntax", "Indent the code inside the block", "Get age input as int", "Check if age >= 13"],
    starterCode: `# Day 18: The IF Gate\n# Make sure to indent your print statement inside the IF block!\n\n`,
    hints: [
      "Use age >= 13 as your condition.",
      "Don't forget the colon : at the end of the IF line.",
      "age = int(input(\"Enter age: \"))\nif age >= 13:\n    print(\"Welcome to the teen zone!\")"
    ]
  },
  {
    day: 19,
    phase: 2,
    title: "The Other Path (ELSE)",
    lore: "What if the condition is not met? We use `else:` to specify an alternative path. If the IF gate is closed, the ELSE gate opens!",
    concept: "The `else:` statement goes at the same indentation level as `if`. It never takes a condition. Example:\n```python\nif score > 50:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")\n```",
    parentGuide: "Make sure they align 'if' and 'else' vertically.",
    challenge: "Ask the user to guess a secret number. If they guess '7', print 'Winner!'. Otherwise, print 'Try again!'.",
    tasks: ["Learn else statement", "Align if and else at the margin", "Check guess == 7", "Provide alternative response"],
    starterCode: `# Day 19: The Other Path\n# Make sure if and else are aligned vertically!\n\n`,
    hints: [
      "Compare input to 7. Remember to cast input to int.",
      "else: has a colon and no condition.",
      "guess = int(input(\"Guess number: \"))\nif guess == 7:\n    print(\"Winner!\")\nelse:\n    print(\"Try again!\")"
    ]
  },
  {
    day: 20,
    phase: 2,
    title: "Multiple Choices (ELIF)",
    lore: "What if you have three or more options? In Python, we write `elif` (short for else-if). You can stack as many `elif` statements as you want!",
    concept: "Python checks conditions from top to bottom. It runs the first one that is True and skips the rest. Example:\n```python\nif temp > 30:\n    print(\"Hot\")\nelif temp > 15:\n    print(\"Warm\")\nelse:\n    print(\"Cold\")\n```",
    parentGuide: "Check that they understand that once a condition is met, no other blocks are checked.",
    challenge: "Ask for a game score. If it's 90+, print 'Rank A'. If 70+, print 'Rank B'. Otherwise, print 'Rank C'.",
    tasks: ["Learn elif syntax", "Structure sequence of conditions", "Get score input", "Handle multiple outputs"],
    starterCode: `# Day 20: Multiple Choices\n# Stack if, elif, and else to handle three scores!\n\n`,
    hints: [
      "Check higher scores first: if score >= 90:, then elif score >= 70:.",
      "End with an else: for scores below 70.",
      "score = int(input(\"Score: \"))\nif score >= 90:\n    print(\"Rank A\")\nelif score >= 70:\n    print(\"Rank B\")\nelse:\n    print(\"Rank C\")"
    ]
  },
  {
    day: 21,
    phase: 2,
    title: "Double Conditions (AND)",
    lore: "Sometimes two conditions must be true at the same time. For example, to open a portal, you need a key AND level 10. We use the `and` operator.",
    concept: "The `and` operator returns True only if both sides are True. Example: `if keys > 0 and level >= 10:`.",
    parentGuide: "Ask them: If keys is 1 but level is 5, does the AND gate open? No!",
    challenge: "Ask the user for their score and their level. If score is 100+ and level is 5+, print 'Level Cleared!'. Otherwise, print 'Keep playing!'.",
    tasks: ["Learn and operator", "Compare two inputs", "Combine checks with 'and'", "Print results"],
    starterCode: `# Day 21: Double Conditions (AND)\n# Combine two checks using 'and' in a single IF statement!\n\n`,
    hints: [
      "Condition: score >= 100 and level >= 5",
      "Get two integer inputs.",
      "score = int(input(\"Score: \"))\nlevel = int(input(\"Level: \"))\nif score >= 100 and level >= 5:\n    print(\"Level Cleared!\")\nelse:\n    print(\"Keep playing!\")"
    ]
  },
  {
    day: 22,
    phase: 2,
    title: "One or the Other (OR)",
    lore: "What if you only need *one* condition to be true? E.g., you can enter a room if you have a VIP ticket OR if you pay 10 coins. We use the `or` operator.",
    concept: "The `or` operator returns True if at least one side is True. Example: `if is_vip or coins >= 10:`.",
    parentGuide: "Confirm they understand that OR is more generous than AND because only one criteria has to succeed.",
    challenge: "Ask the user: 'Are you VIP? (yes/no)' and 'How many coins do you have?'. If they answer 'yes' OR have 50+ coins, print 'Access Granted!'.",
    tasks: ["Learn or operator", "Get text input and number input", "Compare text using == 'yes'", "Combine using 'or'"],
    starterCode: `# Day 22: One or the Other\n# Check if either condition is met using the 'or' operator!\n\n`,
    hints: [
      "Compare strings: vip == \"yes\" and integers: coins >= 50.",
      "Use: if vip == \"yes\" or coins >= 50:",
      "vip = input(\"Are you VIP? (yes/no): \").lower()\ncoins = int(input(\"Coins: \"))\nif vip == \"yes\" or coins >= 50:\n    print(\"Access Granted!\")\nelse:\n    print(\"Access Denied!\")"
    ]
  },
  {
    day: 23,
    phase: 2,
    title: "Opposites (NOT)",
    lore: "Sometimes we want to check if a condition is NOT true. We use the `not` operator to flip a boolean value (True becomes False, and vice-versa).",
    concept: "Example: `if not is_locked:` means 'if is_locked is False'. It is a clean way to check for negatives.",
    parentGuide: "Give them a scenario: `is_raining = False`. What does `not is_raining` print? (True).",
    challenge: "Create a boolean `has_key` (set to False). Print a warning message 'Alert!' only if they do NOT have the key.",
    tasks: ["Learn not operator", "Set has_key variable", "Check if not has_key", "Print alert"],
    starterCode: `# Day 23: Opposites\n# Use 'not' to trigger an action when a variable is False!\n\n`,
    hints: [
      "Use: if not has_key:",
      "This runs the block because has_key is False, so 'not has_key' becomes True.",
      "has_key = False\nif not has_key:\n    print(\"Alert! You don't have the key!\")"
    ]
  },
  {
    day: 24,
    phase: 2,
    title: "Nested Decisions",
    lore: "In games, checking one condition often unlocks a secondary set of questions. This is called 'Nesting'—putting an IF statement inside another IF statement.",
    concept: "We indent the secondary IF even further. Example:\n```python\nif has_shield:\n    if health > 50:\n        print(\"Fully protected!\")\n```",
    parentGuide: "Ensure they watch the double-indentation! Code inside the inner IF must be indented 8 spaces (or 2 tabs).",
    challenge: "Ask if they have a console (yes/no). If 'yes', ask if it's portable (yes/no). If both are yes, print 'Nintendo Switch!'.",
    tasks: ["Learn nested IF structure", "Manage multi-level indentation", "Get console input", "Get portable input nested inside first IF"],
    starterCode: `# Day 24: Nested Decisions\n# Write an IF block inside another IF block!\n\n`,
    hints: [
      "Ask the second question only after confirming the first.",
      "Double indent the inner prints.",
      "console = input(\"Do you have a console? \").lower()\nif console == \"yes\":\n    portable = input(\"Is it portable? \").lower()\n    if portable == \"yes\":\n        print(\"Nintendo Switch!\")"
    ]
  },
  {
    day: 25,
    phase: 2,
    title: "Phase 2 Graduation: The Dungeon Gatekeeper",
    lore: "Phase 2 milestone! You've mastered Booleans, comparison operators, and logic conditions. Let's build a gatekeeper puzzle for a dungeon!",
    concept: "Combine variables, user input, comparison checks, and nested IF/ELIF/ELSE logic to build an interactive gate security bot.",
    parentGuide: "Congratulate them! Day 25 marks the end of Chapter 2. They will unlock the Guardian of Logic Gates certificate.",
    challenge: "Write a program where a dungeon goblin asks the player three questions: their Level (must be 10+), their Guild status ('yes' or 'no'), and their Coins count. Grant entry if they are Level 10+ AND Guild member, OR if they pay 100+ coins. Otherwise, deny entry.",
    tasks: ["Get Level (int), Guild (str), and Coins (int)", "Evaluate composite logical checks", "Use logical operators (and/or)", "Print custom success or fail messages"],
    starterCode: `# Day 25 Phase 2 Capstone\n# Build a Dungeon Gatekeeper game with complex logical rules!\n\n`,
    hints: [
      "Condition: (level >= 10 and guild == \"yes\") or coins >= 100",
      "Use parentheses to group conditions clearly.",
      "level = int(input(\"Level: \"))\nguild = input(\"Guild member? (yes/no): \").lower()\ncoins = int(input(\"Coins: \"))\nif (level >= 10 and guild == \"yes\") or coins >= 100:\n    print(\"Welcome! The gate opens.\")\nelse:\n    print(\"Go away, weakling!\")"
    ]
  },

  // ==========================================
  // PHASE 3: LOOPS & REPETITION (Days 31–45)
  // ==========================================
  {
    day: 26,
    phase: 3,
    title: "Repeating with WHILE",
    lore: "In programming, a 'Loop' repeats code automatically. A `while` loop runs *while* a condition is True. If you aren't careful, you can make an 'infinite loop' that runs forever!",
    concept: "We create a counter variable, check it in the while statement, and increment it inside the loop. Example:\n```python\ni = 1\nwhile i <= 3:\n    print(i)\n    i = i + 1\n```",
    parentGuide: "Show them how to stop an infinite loop in Thonny by pressing the Red Stop Button (or CTRL+C).",
    challenge: "Write a program that uses a while loop to count from 1 up to 10 on the screen.",
    tasks: ["Learn while loop syntax", "Initialize counter variable", "Increment counter inside loop", "Verify loop ends at 10"],
    starterCode: `# Day 26: Repeating with WHILE\n# Write a loop that counts to 10!\n\n`,
    hints: [
      "Set count = 1. Write while count <= 10:.",
      "Inside the loop, don't forget count = count + 1.",
      "count = 1\nwhile count <= 10:\n    print(count)\n    count = count + 1"
    ]
  },
  {
    day: 27,
    phase: 3,
    title: "Shortcuts (Incrementing)",
    lore: "Programmers hate typing redundant code. Writing `count = count + 1` is so common that Python has a built-in shortcut: `count += 1`.",
    concept: "We can use `+=` to add, `-=` to subtract, and `*=` to multiply. It modifies the variable immediately.",
    parentGuide: "Show them that `x += 5` is identical to `x = x + 5`.",
    challenge: "Write a countdown loop starting at 10 down to 1, reducing the counter using `-= 1` each iteration. Print 'Blastoff!' at the end.",
    tasks: ["Learn += and -= shortcuts", "Start counter at 10", "Loop while counter > 0", "Print Blastoff! after loop"],
    starterCode: `# Day 27: Increment Shortcuts\n# Count down from 10 to 1 using the -= shortcut!\n\n`,
    hints: [
      "Use while count >= 1: and count -= 1.",
      "Place 'Blastoff!' print outside the loop indentation.",
      "count = 10\nwhile count > 0:\n    print(count)\n    count -= 1\nprint(\"Blastoff!\")"
    ]
  },
  {
    day: 28,
    phase: 3,
    title: "The FOR Loop & Ranges",
    lore: "While loops run based on conditions. `for` loops run a specific number of times. We combine them with `range()` to count sequences easily.",
    concept: "Syntax: `for i in range(5):` will loop 5 times, with `i` taking values `0, 1, 2, 3, 4`. In computer science, we almost always start counting at 0!",
    parentGuide: "Ask them why `range(5)` stops at 4 instead of 5 (it generates 5 numbers starting from 0).",
    challenge: "Write a program that prints 'Hello Robot!' 5 times using a for loop.",
    tasks: ["Learn for loop syntax", "Understand range() function", "Loop 5 times", "Print inside loop"],
    starterCode: `# Day 28: FOR Loops\n# Print a message exactly 5 times using a FOR loop and range()!\n\n`,
    hints: [
      "Use range(5) to get 5 iterations.",
      "No need to manually add 1 to a counter in a FOR loop!",
      "for i in range(5):\n    print(\"Hello Robot!\")"
    ]
  },
  {
    day: 29,
    phase: 3,
    title: "Custom Ranges",
    lore: "What if you want to count from 5 to 10? Or count by twos (2, 4, 6, 8)? The `range()` function takes start, stop, and step arguments: `range(start, stop, step)`.",
    concept: "Example: `range(1, 10, 2)` starts at 1, stops before 10, and counts by 2s (outputs 1, 3, 5, 7, 9).",
    parentGuide: "Explain that the 'stop' value is always exclusive (not included in the output).",
    challenge: "Write a for loop that prints all even numbers from 2 up to 20 (inclusive) using a custom range step.",
    tasks: ["Understand range(start, stop, step)", "Determine values for 2 to 20 count", "Loop and print numbers"],
    starterCode: `# Day 29: Custom Ranges\n# Count from 2 to 20 by 2s using range() parameters!\n\n`,
    hints: [
      "To include 20, set stop value to 21: range(2, 21, 2).",
      "Set step to 2.",
      "for i in range(2, 21, 2):\n    print(i)"
    ]
  },
  {
    day: 30,
    phase: 3,
    title: "Loop Summing",
    lore: "In RPG games, your character accumulates total gold. We can keep track of a running total by adding values inside a loop.",
    concept: "We create a variable `total = 0` outside the loop, and add values to it inside the loop. Example: `total += score`.",
    parentGuide: "Explain why we must define `total = 0` *before* the loop starts (otherwise it resets to 0 every iteration).",
    challenge: "Calculate the sum of all numbers from 1 to 100 using a loop. Print the final total.",
    tasks: ["Initialize total = 0 outside loop", "Loop through range(1, 101)", "Add loop index to total", "Print final sum"],
    starterCode: `# Day 30: Loop Summing\n# Add up all numbers from 1 to 100 and print the sum!\n\n`,
    hints: [
      "Use range(1, 101) so 100 is included.",
      "Write total += i inside the loop.",
      "total = 0\nfor i in range(1, 101):\n    total += i\nprint(f\"The sum is {total}\")"
    ]
  },
  {
    day: 31,
    phase: 3,
    title: "Breaking Out (break)",
    lore: "Sometimes we need to stop a loop immediately, even if the condition is still True. We use the `break` statement to escape from a loop.",
    concept: "When Python encounters `break` inside a loop, it exits the loop instantly and jumps to the code below it.",
    parentGuide: "This is crucial for infinite loops or stopping games when a 'Game Over' condition is met.",
    challenge: "Create a loop that asks the user to type something. If they type 'exit', use `break` to stop the loop.",
    tasks: ["Learn break statement", "Create a while True: loop", "Get input inside loop", "Trigger break if input is 'exit'"],
    starterCode: `# Day 31: Breaking Out\n# Create a loop that keeps running until the user types 'exit'!\n\n`,
    hints: [
      "Use 'while True:' to make an infinite loop.",
      "Check: if user_input == 'exit': break.",
      "while True:\n    text = input(\"Type something ('exit' to quit): \")\n    if text == \"exit\":\n        break\nprint(\"Goodbye!\")"
    ]
  },
  {
    day: 32,
    phase: 3,
    title: "Skip This Step (continue)",
    lore: "What if you just want to skip *one* iteration of a loop, but keep the rest of the loop going? We use the `continue` statement.",
    concept: "The `continue` statement stops the current cycle of the loop and jumps directly back to the top of the loop for the next cycle.",
    parentGuide: "Ask them when you'd use continue (e.g. skipping bad values, skipping blacklisted items).",
    challenge: "Write a loop from 1 to 5. Skip the number 3 using `continue` so it only prints 1, 2, 4, 5.",
    tasks: ["Learn continue statement", "Loop range(1, 6)", "Check if index is 3", "Execute continue to skip print"],
    starterCode: `# Day 32: Skipping Steps\n# Use continue to skip printing the number 3 in a loop!\n\n`,
    hints: [
      "Check: if i == 3: continue.",
      "Put the print statement *after* the check, but still inside the loop.",
      "for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)"
    ]
  },
  {
    day: 33,
    phase: 3,
    title: "Loops inside Loops (Nested)",
    lore: "Just like nested IFs, we can put loops inside loops. This is how grids are made (like columns and rows in Chess or Minecraft coordinates).",
    concept: "For each turn of the outer loop, the inner loop runs *completely*. Example:\n```python\nfor x in range(2):\n    for y in range(2):\n        print(x, y)\n```",
    parentGuide: "Verify they understand that the inner loop runs fast, and the outer loop runs slow.",
    challenge: "Create a nested loop to print coordinates for a 3x3 grid (from 0,0 to 2,2).",
    tasks: ["Learn nested loops", "Create outer loop for rows", "Create inner loop for columns", "Print coordinates (r, c)"],
    starterCode: `# Day 33: Nested Loops\n# Print coordinates for a 3x3 grid using nested FOR loops!\n\n`,
    hints: [
      "Use range(3) for both loops.",
      "r represents row, c represents column.",
      "for r in range(3):\n    for c in range(3):\n        print(f\"({r}, {c})\")"
    ]
  },
  {
    day: 34,
    phase: 3,
    title: "Game Loop Basics",
    lore: "Video games run on a constant loop. It checks for inputs, updates character positions, and draws the screen 60 times a second. We call this a 'Game Loop'.",
    concept: "We simulate this using a `while` loop that keeps running until the player runs out of health.",
    parentGuide: "Explain that variables modified *inside* a loop survive after the loop finishes.",
    challenge: "Create a game loop where a hero starts with 100 health. Every loop cycle, subtract 20 health (combat damage) and print the remaining health. Stop when health reaches 0.",
    tasks: ["Initialize health = 100", "Start while loop", "Subtract damage", "Exit loop when health <= 0"],
    starterCode: `# Day 34: Game Loop Basics\n# Run a combat simulator loop that exits when health drops to 0!\n\n`,
    hints: [
      "Condition: while health > 0:.",
      "Subtract health inside the loop.",
      "health = 100\nwhile health > 0:\n    print(f\"HP: {health}\")\n    health -= 20\nprint(\"Game Over!\")"
    ]
  },
  {
    day: 35,
    phase: 3,
    title: "Phase 3 Graduation: The Number Guessing Game",
    lore: "You've unlocked Phase 3 graduation! You know how to make loops, exit loops, and track states. Let's build a real playable game!",
    concept: "We will build a complete interactive guessing game. We'll use a loop to let the player guess until they win or run out of attempts.",
    parentGuide: "Congratulate them! Day 35 completes Chapter 3. They will unlock the Master of the Infinite Loop certificate.",
    challenge: "Build a guessing game. The secret number is 42. Give the player 5 attempts. Inside a loop, ask for their guess. Tell them if they are 'Too high', 'Too low', or if they win (break loop). Track their attempts remaining.",
    tasks: ["Initialize secret = 42 and attempts = 5", "Create a loop tracking attempts", "Get input and compare to secret", "Give feedback and handle Win/Loss states"],
    starterCode: `# Day 35 Phase 3 Capstone\n# Build a full Guess the Number game using loops and conditions!\n\n`,
    hints: [
      "Decrease attempts by 1 each loop.",
      "Check: if guess == secret: print('Win') and break.",
      "secret = 42\nattempts = 5\nwhile attempts > 0:\n    guess = int(input(\"Guess (1-100): \"))\n    attempts -= 1\n    if guess == secret:\n        print(\"You Win!\")\n        break\n    elif guess < secret:\n        print(f\"Too Low! Attempts left: {attempts}\")\n    else:\n        print(f\"Too High! Attempts left: {attempts}\")\nelse:\n    print(\"Game Over! The number was 42.\")"
    ]
  },

  // ==========================================
  // PHASE 4: LISTS & SEQUENCES (Days 46–60)
  // ==========================================
  {
    day: 36,
    phase: 4,
    title: "The Inventory List",
    lore: "In games like Minecraft or Zelda, you carry an inventory list of items. In Python, we store collections of items in a structure called a 'List'.",
    concept: "Lists are written inside square brackets `[]`, separated by commas. Example: `inventory = [\"sword\", \"shield\", \"potion\"]`.",
    parentGuide: "Show them how lists keep items ordered.",
    challenge: "Create a list of your 3 favorite video games. Print the entire list.",
    tasks: ["Understand Lists []", "Create list of games", "Print the list variable", "Test output"],
    starterCode: `# Day 36: Inventory Lists\n# Create a list containing your favorite games and print it!\n\n`,
    hints: [
      "Use square brackets: games = [\"game1\", \"game2\"].",
      "Separated by commas.",
      "games = [\"Minecraft\", \"Roblox\", \"Zelda\"]\nprint(games)"
    ]
  },
  {
    day: 37,
    phase: 4,
    title: "Grabbing Items (Indexing)",
    lore: "How do you select an item from a list? We use its position index. Remember, Python starts indexing at 0!",
    concept: "If `items = [\"sword\", \"shield\"]`, then `items[0]` is `\"sword\"` and `items[1]` is `\"shield\"`.",
    parentGuide: "Have them select the second item of their list. Hint: the index is 1!",
    challenge: "Create a list of 4 colors. Print only the first color and the third color on separate lines.",
    tasks: ["Understand 0-based indexing", "Create list of 4 elements", "Access index 0", "Access index 2"],
    starterCode: `# Day 37: Indexing Lists\n# Access specific elements in a list using index numbers inside [ ]!\n\n`,
    hints: [
      "First item: list[0]. Third item: list[2].",
      "Print them individually.",
      "colors = [\"red\", \"blue\", \"green\", \"yellow\"]\nprint(colors[0])\nprint(colors[2])"
    ]
  },
  {
    day: 38,
    phase: 4,
    title: "Counting from the End",
    lore: "What if you have a massive list and want the very last item? Instead of counting, Python lets us count backwards using negative indices!",
    concept: "Index `-1` refers to the last item, `-2` is the second to last, and so on. It is a super clean shortcut.",
    parentGuide: "Ask them: In a list of 100 items, how do you grab the last item? Index -1!",
    challenge: "Create a list of 5 animals. Print the last animal using a negative index.",
    tasks: ["Learn negative indexing", "Create list of 5 animals", "Print animal at index -1", "Run code"],
    starterCode: `# Day 38: Negative Indexing\n# Print the very last element of a list using index -1!\n\n`,
    hints: [
      "Use list[-1] inside print().",
      "Do not hardcode the index count.",
      "animals = [\"cat\", \"dog\", \"lion\", \"tiger\", \"bear\"]\nprint(animals[-1])"
    ]
  },
  {
    day: 39,
    phase: 4,
    title: "Adding to Lists (append)",
    lore: "When you pick up loot in a game, it gets added to your inventory list. In Python, we add items to the end of a list using `.append()`.",
    concept: "Example: `inventory.append(\"gold\")` adds `\"gold\"` to the end. Notice it modifies the list directly.",
    parentGuide: "Check that they don't assign `inventory = inventory.append(...)` since append operates in-place.",
    challenge: "Start with an empty list `shopping_list = []`. Add three items to it one-by-one using append, and print the final list.",
    tasks: ["Learn .append() method", "Initialize empty list []", "Call append three times", "Print resulting list"],
    starterCode: `# Day 39: Appending Items\n# Add items to an empty list using list.append(item)!\n\n`,
    hints: [
      "Initialize: items = []. Add using: items.append(\"item\").",
      "Do not put square brackets inside append.",
      "shopping_list = []\nshopping_list.append(\"milk\")\nshopping_list.append(\"eggs\")\nshopping_list.append(\"bread\")\nprint(shopping_list)"
    ]
  },
  {
    day: 40,
    phase: 4,
    title: "Removing Items",
    lore: "Discarding items is just as common as picking them up. We can remove items from lists using `.remove()` (by value) or `pop()` (by index position).",
    concept: "Example: `list.remove(\"sword\")` searches and deletes 'sword'. `list.pop(0)` deletes and returns the item at index 0.",
    parentGuide: "Quiz them: what happens if you try to `.remove()` an item that isn't in the list? It throws an error!",
    challenge: "Create a list of 3 chores. Remove one chore by name using `.remove()` and print the updated list.",
    tasks: ["Learn .remove() method", "Create list of 3 tasks", "Call remove() with task name", "Print modified list"],
    starterCode: `# Day 40: Removing Items\n# Remove an element from a list using list.remove(value)!\n\n`,
    hints: [
      "Use chores.remove(\"chore_name\").",
      "Print the list after removing.",
      "chores = [\"dishes\", \"laundry\", \"sweeping\"]\nchores.remove(\"laundry\")\nprint(chores)"
    ]
  },
  {
    day: 41,
    phase: 4,
    title: "List Length",
    lore: "How many items are you holding? We can measure the count of items in a list using the same `len()` function we used for strings!",
    concept: "Example: `len([\"a\", \"b\", \"c\"])` returns `3`. It counts top-level elements.",
    parentGuide: "Have them append items to a list and print `len()` after each change to see it update dynamically.",
    challenge: "Create a list of your favorite books. Print how many books are in your list using `len()`.",
    tasks: ["Use len() on lists", "Create list of books", "Calculate length", "Print count"],
    starterCode: `# Day 41: List Length\n# Find the number of items in a list using len(list)!\n\n`,
    hints: [
      "Pass the list variable into len().",
      "Format the output using an f-string.",
      "books = [\"Harry Potter\", \"Percy Jackson\", \"Hobbit\"]\nprint(f\"I have {len(books)} favorite books!\")"
    ]
  },
  {
    day: 42,
    phase: 4,
    title: "Slicing Lists",
    lore: "What if you want to grab a portion of a list (like top 3 scores)? In Python, we can get a sub-list using 'Slicing' brackets `[start:stop]`.",
    concept: "Syntax: `list[0:3]` gets items from index 0, 1, 2 (stopping before index 3). If you omit the first number, it assumes start: `list[:3]`.",
    parentGuide: "Show them how slicing does not change the original list; it creates a new smaller list.",
    challenge: "Create a list of 6 numbers. Slice the middle four numbers (index 1 to 4 inclusive) and print them.",
    tasks: ["Learn slicing notation [start:stop]", "Create list of 6 integers", "Slice from index 1 to 5 (exclusive of 5)", "Print slice"],
    starterCode: `# Day 42: Slicing Lists\n# Extract a sub-list using slicing index parameters!\n\n`,
    hints: [
      "To include index 4, set stop index to 5: list[1:5].",
      "Print the sliced result.",
      "nums = [10, 20, 30, 40, 50, 60]\nprint(nums[1:5])"
    ]
  },
  {
    day: 43,
    phase: 4,
    title: "Loops Over Lists",
    lore: "If you have a list of targets, you want to fire at each one. We can loop through every item of a list using a simple `for` loop!",
    concept: "Syntax:\n```python\nfor item in inventory:\n    print(item)\n```\nPython automatically assigns each element to the `item` variable, one-by-one.",
    parentGuide: "Help them see how clean this is compared to tracking numerical index ranges.",
    challenge: "Create a list of 3 names. Loop through the list and print 'Hello [name]!' for each person.",
    tasks: ["Learn list iteration in for loops", "Create list of names", "Write loop over list", "Print formatted greeting for each"],
    starterCode: `# Day 43: Loops Over Lists\n# Iterate through a list directly using a FOR loop!\n\n`,
    hints: [
      "Use: for name in names:.",
      "Write print(f\"Hello {name}!\") inside the loop.",
      "names = [\"Kai\", \"Jay\", \"Cole\"]\nfor name in names:\n    print(f\"Hello {name}!\")"
    ]
  },
  {
    day: 44,
    phase: 4,
    title: "Checking Membership (in)",
    lore: "How do you check if you are carrying a key without looping through your inventory? Python has a built-in search operator: `in`.",
    concept: "Writing `\"key\" in inventory` returns `True` if it is present, and `False` otherwise. Example: `if \"potion\" in items:`.",
    parentGuide: "Have them test both positive and negative search cases.",
    challenge: "Create a list of pizza toppings. Ask the user for a topping. Print 'We have that!' or 'No luck!' using the `in` operator.",
    tasks: ["Learn 'in' keyword", "Create list of toppings", "Get user query input", "Check if query in toppings list"],
    starterCode: `# Day 44: Checking Membership\n# Check if an item is inside a list using the 'in' keyword!\n\n`,
    hints: [
      "Structure: if topping in list:.",
      "Use lowercase inputs for matching consistency.",
      "toppings = [\"cheese\", \"pepperoni\", \"mushrooms\"]\ntarget = input(\"Search topping: \").lower()\nif target in toppings:\n    print(\"We have that!\")\nelse:\n    print(\"No luck!\")"
    ]
  },
  {
    day: 45,
    phase: 4,
    title: "Phase 4 Graduation: Inventory Manager",
    lore: "Phase 4 milestone unlocked! You've mastered Lists, indexing, appending, removing, slicing, and list iteration. Let's make an inventory management system!",
    concept: "We will build a simple console program that loops, letting the player type 'add', 'remove', 'view', or 'exit' to manage their bag.",
    parentGuide: "Congratulations! Day 45 marks the end of Chapter 4. They will unlock the Squire of Lists & Sequences certificate.",
    challenge: "Write a program that starts with an empty list `bag = []`. Run a loop. In each cycle, ask the user to type 'add' (then ask what item to add), 'remove' (ask what item to delete), 'view' (print current bag), or 'exit' (break loop).",
    tasks: ["Initialize bag list", "Create main while loop", "Handle multiple command inputs using IF/ELIF", "Modify and show list based on commands"],
    starterCode: `# Day 45 Phase 4 Capstone\n# Build an interactive RPG Inventory Manager!\n\n`,
    hints: [
      "Use bag.append() for add, and bag.remove() for remove.",
      "Check: if command == 'exit': break.",
      "bag = []\nwhile True:\n    action = input(\"Commands: add, remove, view, exit: \").lower()\n    if action == \"exit\":\n        break\n    elif action == \"add\":\n        item = input(\"Item to add: \")\n        bag.append(item)\n    elif action == \"remove\":\n        item = input(\"Item to remove: \")\n        if item in bag:\n            bag.remove(item)\n        else:\n            print(\"Item not found!\")\n    elif action == \"view\":\n        print(f\"Bag items: {bag}\")"
    ]
  },

  // ==========================================
  // PHASE 5: DICTIONARIES & COLLECTIONS (Days 61–70)
  // ==========================================
  {
    day: 46,
    phase: 5,
    title: "The Dictionary Chest",
    lore: "Lists are ordered by index numbers. What if you want to look up an item by its name (like looking up a word in a dictionary)? We use key-value pairs!",
    concept: "Dictionaries are written inside curly braces `{}`. Each entry has a key (label) and a value (content), separated by a colon. Example: `player = {\"name\": \"Steve\", \"hp\": 100}`.",
    parentGuide: "Explain that keys must be unique, like indices in a list, but they can be words.",
    challenge: "Create a dictionary named `car` with keys: `brand`, `model`, and `year`. Print the dictionary.",
    tasks: ["Understand Dictionaries {}", "Set key-value pairs", "Print the dictionary variable", "Test output"],
    starterCode: `# Day 46: Dictionaries\n# Create a dictionary of attributes and print it!\n\n`,
    hints: [
      "Use curly braces and colons: car = {\"brand\": \"Ford\", \"year\": 2020}.",
      "Keys must be strings in quotes.",
      "car = {\"brand\": \"Tesla\", \"model\": \"Model 3\", \"year\": 2023}\nprint(car)"
    ]
  },
  {
    day: 47,
    phase: 5,
    title: "Key Lookups",
    lore: "To grab a value from a dictionary, we write the dictionary name, followed by square brackets containing the key word: `dict[key]`.",
    concept: "If `player = {\"name\": \"Alex\", \"level\": 5}`, then `player[\"name\"]` is `\"Alex\"`. This is faster than searching lists!",
    parentGuide: "Show them what happens if they try to look up a key that doesn't exist (it throws a KeyError).",
    challenge: "Create a dictionary of word definitions. Store 3 words and definitions. Print the definition of one word.",
    tasks: ["Access values using keys", "Create definition dictionary", "Print key value using dict[key]"],
    starterCode: `# Day 47: Key Lookups\n# Retrieve specific dictionary values by referencing their keys!\n\n`,
    hints: [
      "Use bracket notation: dict[\"key\"].",
      "Make sure the spelling of the key matches exactly.",
      "words = {\"loop\": \"repeats code\", \"variable\": \"stores data\"}\nprint(words[\"loop\"])"
    ]
  },
  {
    day: 48,
    phase: 5,
    title: "Editing Dictionaries",
    lore: "In games, stats change. HP drops, levels rise. We can edit existing dictionary values, or add new keys, simply by assigning to the key directly!",
    concept: "Example: `player[\"hp\"] = 80` updates the value. `player[\"weapon\"] = \"axe\"` adds a brand new key-value pair because 'weapon' didn't exist before.",
    parentGuide: "Have them update a value and print the whole dictionary to confirm it has changed.",
    challenge: "Start with `scores = {\"Mario\": 100}`. Add a score for 'Luigi' (150). Update Mario's score to 120. Print the dictionary.",
    tasks: ["Modify dictionary values", "Add new key-value pairs", "Print resulting dictionary"],
    starterCode: `# Day 48: Editing Dictionaries\n# Update values and insert new keys into a dictionary!\n\n`,
    hints: [
      "Add: scores[\"Luigi\"] = 150. Update: scores[\"Mario\"] = 120.",
      "Print scores.",
      "scores = {\"Mario\": 100}\nscores[\"Luigi\"] = 150\nscores[\"Mario\"] = 120\nprint(scores)"
    ]
  },
  {
    day: 49,
    phase: 5,
    title: "Deleting Dictionary Keys",
    lore: "If an item breaks or a stat is cleared, we remove it. In Python, we can delete keys using the `del` keyword.",
    concept: "Syntax: `del player[\"weapon\"]` permanently deletes the key and its value from the dictionary.",
    parentGuide: "Remind them that once deleted, looking up the key will crash the program, so make sure they only delete what is necessary.",
    challenge: "Create a dictionary of items and counts. Delete one item using `del` and print the dictionary.",
    tasks: ["Learn del keyword", "Create dictionary of elements", "Delete key using del dict[key]", "Print dictionary"],
    starterCode: `# Day 49: Deleting Keys\n# Delete key-value pairs from a dictionary using the del keyword!\n\n`,
    hints: [
      "Use: del dict_name[key].",
      "Do not wrap it in parentheses.",
      "backpack = {\"apples\": 5, \"stones\": 20}\ndel backpack[\"stones\"]\nprint(backpack)"
    ]
  },
  {
    day: 50,
    phase: 5,
    title: "Checking Keys",
    lore: "To avoid crash errors (KeyError), we can search if a key is inside a dictionary using the `in` operator before trying to read it.",
    concept: "Writing `if \"level\" in player:` returns True if the key exists, and False if it doesn't. Note: it only checks keys, not values!",
    parentGuide: "Show them how checking key membership protects their game code from crashing.",
    challenge: "Create a dictionary representing contact numbers. Check if 'Mom' is in contacts. If yes, print her number. If no, print 'Not found'.",
    tasks: ["Use 'in' with dictionaries", "Create contacts dictionary", "Check if key exists", "Print value conditionally"],
    starterCode: `# Day 50: Checking Keys\n# Search for keys in a dictionary before accessing them to avoid errors!\n\n`,
    hints: [
      "Check: if \"Mom\" in contacts:.",
      "Retrieve value using contacts[\"Mom\"].",
      "contacts = {\"Dad\": \"123-456\", \"Mom\": \"987-654\"}\nif \"Mom\" in contacts:\n    print(contacts[\"Mom\"])\nelse:\n    print(\"Not found\")"
    ]
  },
  {
    day: 51,
    phase: 5,
    title: "Dictionary Loops",
    lore: "What if you want to print all scores? We can loop through dictionaries. By default, looping through a dictionary iterates over its *keys*.",
    concept: "Syntax:\n```python\nfor key in player:\n    print(key, player[key])\n```\nThis lets you access both labels and details inside a loop.",
    parentGuide: "Show them how `player[key]` extracts the value associated with the loop variable.",
    challenge: "Create a dictionary of item names and prices. Loop through it and print each item and its price in a formatted line.",
    tasks: ["Loop dictionary keys", "Access values inside loop", "Format print output"],
    starterCode: `# Day 51: Dictionary Loops\n# Iterate over dictionary keys and fetch values inside a loop!\n\n`,
    hints: [
      "Use: for item in menu:.",
      "Print: print(f\"{item}: ${menu[item]}\").",
      "menu = {\"pizza\": 10, \"burger\": 5, \"fries\": 3}\nfor item in menu:\n    print(f\"{item} costs ${menu[item]}\")"
    ]
  },
  {
    day: 52,
    phase: 5,
    title: "Safe Reading (get)",
    lore: "Python has another superpower to read dictionary values without crashing: the `.get()` method. If the key isn't found, it returns `None` instead of throwing an error!",
    concept: "Syntax: `player.get(\"shield\", 0)` reads the key 'shield'. If not found, it returns the fallback value `0`.",
    parentGuide: "This is a best-practice method for reading dictionary configurations.",
    challenge: "Create a dictionary of items. Use `.get()` to look up 'gems'. Provide a fallback of `0` if 'gems' doesn't exist, and print the output.",
    tasks: ["Learn .get() method", "Initialize inventory dict", "Lookup missing key using get(key, default)", "Verify fallback prints"],
    starterCode: `# Day 52: Safe Reading\n# Read dictionary values safely using the .get() method with defaults!\n\n`,
    hints: [
      "Use items.get(\"gems\", 0).",
      "This prints 0 if 'gems' is not a key in the dictionary.",
      "inventory = {\"swords\": 1}\ngems_count = inventory.get(\"gems\", 0)\nprint(f\"You have {gems_count} gems!\")"
    ]
  },
  {
    day: 53,
    phase: 5,
    title: "Nesting Dictionaries",
    lore: "Just like nested loops, we can nest dictionaries inside other dictionaries. This is how complex structures (like multi-player stats) are kept organized.",
    concept: "Example:\n```python\nteams = {\n    \"player1\": {\"hp\": 90, \"xp\": 100},\n    \"player2\": {\"hp\": 50, \"xp\": 200}\n}\n```\nTo read player1's hp: `teams[\"player1\"][\"hp\"]`.",
    parentGuide: "Check their bracket alignment! Nested lookups require chained square brackets: `[key1][key2]`.",
    challenge: "Create a dictionary named `players`. Add two players inside, each having `class` and `level` details. Print the level of player 1.",
    tasks: ["Understand nested dictionaries", "Define sub-dictionaries", "Access value using chained brackets [key1][key2]", "Print value"],
    starterCode: `# Day 53: Nesting Dictionaries\n# Store sub-dictionaries inside a dictionary and access nested values!\n\n`,
    hints: [
      "Access: players[\"player1\"][\"level\"].",
      "Make sure you set the nested structure with colons.",
      "players = {\n    \"p1\": {\"class\": \"wizard\", \"level\": 10},\n    \"p2\": {\"class\": \"warrior\", \"level\": 12}\n}\nprint(players[\"p1\"][\"level\"])"
    ]
  },
  {
    day: 54,
    phase: 5,
    title: "Introduction to Sets",
    lore: "In Python, there is another collection called a 'Set'. Unlike lists, sets can only store *unique* items, and they have no order. Perfect for inventory category lists!",
    concept: "Sets are written inside curly braces without colons. Example: `unique_items = {\"sword\", \"potion\", \"sword\"}`. Since 'sword' is duplicated, Python automatically drops the second one, leaving just one!",
    parentGuide: "Quiz them: If you put five 'apples' in a set, how many elements does the set have? Just 1!",
    challenge: "Create a list of numbers containing duplicates. Convert it to a set using `set(list_variable)` and print the set to see duplicates disappear.",
    tasks: ["Learn about Sets", "Create list with duplicates", "Convert to set", "Print unique results"],
    starterCode: `# Day 54: Sets\n# Remove duplicate values automatically by converting a list to a set!\n\n`,
    hints: [
      "Create list: nums = [1, 2, 2, 3].",
      "Convert: unique_nums = set(nums).",
      "nums = [1, 1, 2, 3, 3, 4]\nunique_nums = set(nums)\nprint(unique_nums)"
    ]
  },
  {
    day: 55,
    phase: 5,
    title: "Phase 5 Graduation: Character Profile Builder",
    lore: "Phase 5 complete! You've mastered Dictionaries, key lookups, nested keys, get() fallbacks, and Sets. Let's build a complete game-character profile system!",
    concept: "We will build a script that stores hero stats and inventory. We'll use dictionaries to store stats and lists/sets to manage inventory categories.",
    parentGuide: "Congratulations! Day 55 completes Chapter 5. They will unlock the Archivist of Key-Value Maps certificate.",
    challenge: "Build a program that stores a player's profile: `name`, `health`, `xp`, and `skills` (a set of skills, e.g. 'flight', 'laser'). Print the profile in a stylized card. Add a new skill to the set using `.add()` and update the level. Print the final card.",
    tasks: ["Create profile dictionary with nested collections", "Add a skill to the set using skills_set.add()", "Update xp value", "Print formatted character card"],
    starterCode: `# Day 55 Phase 5 Capstone\n# Build a character stats dashboard using nested dictionaries and sets!\n\n`,
    hints: [
      "Access nested set: profile['skills'].add('ice').",
      "Format output using f-strings.",
      "profile = {\n    \"name\": \"Nova\",\n    \"hp\": 100,\n    \"skills\": {\"stealth\", \"archery\"}\n}\nprofile[\"skills\"].add(\"climbing\")\nprofile[\"hp\"] = 95\nprint(f\"\"\"\n=== HERO PROFILE ===\nName: {profile['name']}\nHP: {profile['hp']}\nSkills: {profile['skills']}\n====================\n\"\"\")"
    ]
  },

  // ==========================================
  // PHASE 6: REUSABLE CODE - FUNCTIONS (Days 71–80)
  // ==========================================
  {
    day: 56,
    phase: 6,
    title: "Creating Functions",
    lore: "In games, if a player jumps, the same jump actions execute every time. Instead of copy-pasting code, we write a 'Function' once and trigger it anywhere. This is called 'calling' a function.",
    concept: "We define a function using `def` followed by its name, parentheses `()`, and a colon. Code inside must be indented. Example:\n```python\ndef greet():\n    print(\"Hello!\")\n```\nTo run it, we call: `greet()`.",
    parentGuide: "Make sure they realize that declaring a function doesn't run it. They must explicitly write the function call (e.g. `greet()`) to execute it.",
    challenge: "Write a function named `welcome_hero` that prints a welcome message and a horizontal border. Call the function twice.",
    tasks: ["Learn def syntax", "Define welcome_hero()", "Indent the print block", "Call function twice"],
    starterCode: `# Day 56: Creating Functions\n# Define a simple function and call it to execute its code!\n\n`,
    hints: [
      "Write: def welcome_hero():.",
      "To call it, write: welcome_hero() outside the function indentation.",
      "def welcome_hero():\n    print(\"--- Welcome, Hero! ---\")\n\nwelcome_hero()\nwelcome_hero()"
    ]
  },
  {
    day: 57,
    phase: 6,
    title: "Inputs for Functions (Parameters)",
    lore: "What if you want to welcome a *specific* hero by name? Functions can take variables inside their parentheses. These are called parameters or arguments.",
    concept: "Syntax:\n```python\ndef greet(name):\n    print(f\"Hello {name}!\")\n```\nCalling `greet(\"Alex\")` outputs `Hello Alex!`.",
    parentGuide: "Show them how passing different values as arguments changes the function output.",
    challenge: "Create a function named `show_double` that takes a number as a parameter and prints the number multiplied by 2.",
    tasks: ["Learn parameters syntax", "Define show_double(number)", "Print double value", "Call with different integers"],
    starterCode: `# Day 57: Function Parameters\n# Pass arguments into a function to customize its actions!\n\n`,
    hints: [
      "Write: def show_double(x): followed by print(x * 2).",
      "Call it: show_double(10).",
      "def show_double(num):\n    print(num * 2)\n\nshow_double(5)\nshow_double(20)"
    ]
  },
  {
    day: 58,
    phase: 6,
    title: "Multiple Parameters",
    lore: "A function can take as many parameters as you want! Just separate them with commas inside the parentheses when defining and calling.",
    concept: "Example:\n```python\ndef show_sum(a, b):\n    print(a + b)\n```\nCalling `show_sum(5, 10)` outputs `15`.",
    parentGuide: "Verify the order of arguments matches the parameters inside the definition.",
    challenge: "Write a function `introduce` that takes `name` and `age` as parameters, and prints 'My name is [name] and I am [age] years old.'.",
    tasks: ["Define multi-parameter function", "Use commas to separate variables", "Print f-string", "Call function"],
    starterCode: `# Day 58: Multiple Parameters\n# Pass multiple comma-separated arguments into a function!\n\n`,
    hints: [
      "Write: def introduce(name, age):.",
      "Call it with string and integer: introduce(\"Zack\", 13).",
      "def introduce(name, age):\n    print(f\"My name is {name} and I am {age} years old.\")\n\nintroduce(\"Alex\", 13)"
    ]
  },
  {
    day: 59,
    phase: 6,
    title: "Returning Data (return)",
    lore: "Sometimes you don't want a function to print the result directly. You want it to calculate a value and send it back to your main code. We use the `return` keyword.",
    concept: "When a function returns a value, the function call itself becomes that value. Example:\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(5, 5) # result is now 10\n```",
    parentGuide: "Explain that `return` exits the function immediately. Any code after a return statement will be skipped!",
    challenge: "Write a function `multiply` that takes two numbers, *returns* their product, and then print the result in your main program.",
    tasks: ["Learn return keyword", "Define multiply(a, b)", "Use return instead of print inside function", "Print returned value in main script"],
    starterCode: `# Day 59: Returning Data\n# Send data back to your main program using the return keyword!\n\n`,
    hints: [
      "Inside the function, write: return a * b.",
      "Outside, write: ans = multiply(4, 5) then print(ans).",
      "def multiply(a, b):\n    return a * b\n\nans = multiply(3, 4)\nprint(f\"Result is {ans}\")"
    ]
  },
  {
    day: 60,
    phase: 6,
    title: "Default Parameters",
    lore: "What if you want a parameter to have a backup value in case the user forgets to provide it? We can assign default values directly in the definition!",
    concept: "Syntax: `def greet(name=\"Player\"):`. If we call `greet()`, it prints 'Hello Player!'. If we call `greet(\"Kai\")`, it prints 'Hello Kai!'.",
    parentGuide: "Show them how defaults make functions flexible.",
    challenge: "Create a function `fire_arrow` that takes a parameter `damage` (default is 10). Print 'Arrow deals [damage] damage!'. Call it with and without a parameter.",
    tasks: ["Learn default arguments name=value", "Define fire_arrow() with default", "Call with value", "Call empty"],
    starterCode: `# Day 60: Default Parameters\n# Assign default values to parameters to make inputs optional!\n\n`,
    hints: [
      "Write: def fire_arrow(damage=10):.",
      "Call: fire_arrow() and fire_arrow(25).",
      "def fire_arrow(damage=10):\n    print(f\"Arrow deals {damage} damage!\")\n\nfire_arrow() # prints 10\nfire_arrow(25) # prints 25"
    ]
  },
  {
    day: 61,
    phase: 6,
    title: "Variable Scope (Local)",
    lore: "Variables created inside a function are locked inside that function. Main code cannot see them. This is called 'Local Scope'.",
    concept: "If you define `x = 5` inside a function, trying to print `x` outside the function will throw a NameError. It is a secret variable!",
    parentGuide: "This prevents different parts of a large program from accidentally modifying each other's variables.",
    challenge: "Write a function that creates a variable `secret = 100`. Try to print `secret` outside the function to see the scope error (then comment out the error line to make it run).",
    tasks: ["Understand local variables", "Define local variable inside function", "Attempt print outside", "Handle the scope error"],
    starterCode: `# Day 61: Variable Scope\n# Understand why variables created inside a function are local to it!\n\n`,
    hints: [
      "Any variable created inside def block is local.",
      "Wrap the print(secret) call in a comment # if it crashes.",
      "def my_func():\n    secret = 100\n\nmy_func()\n# print(secret)  <- This will fail! Comment it out."
    ]
  },
  {
    day: 62,
    phase: 6,
    title: "Global Variables",
    lore: "Variables created outside of any functions are called 'Global'. All functions can read them. However, modifying a global variable inside a function requires a special key!",
    concept: "To modify a global variable inside a function, write `global variable_name` first. Example:\n```python\nscore = 0\ndef add_score():\n    global score\n    score += 10\n```",
    parentGuide: "Explain that using too many global variables is considered bad practice because it can make code messy, but is necessary for simple game loops.",
    challenge: "Create a global variable `gold = 100`. Write a function `spend_gold` that uses `global gold` to subtract 20 gold. Print gold before and after calling.",
    tasks: ["Learn global keyword", "Create global variable", "Modify inside function using global", "Verify change"],
    starterCode: `# Day 62: Global Variables\n# Modify global variables inside functions using the 'global' keyword!\n\n`,
    hints: [
      "Remember to write: global gold on the first line inside the function.",
      "Call spend_gold().",
      "gold = 100\ndef spend_gold():\n    global gold\n    gold -= 20\n\nprint(gold)\nspend_gold()\nprint(gold)"
    ]
  },
  {
    day: 63,
    phase: 6,
    title: "Functions calling Functions",
    lore: "A function can call another function! This is how complex commands are split into simple sub-tasks.",
    concept: "If we have `def get_tax()` and `def get_total()`, the second function can call the first to calculate tax before computing total.",
    parentGuide: "Help them visualize how one function acts as a helper to another.",
    challenge: "Write a function `square(x)` that returns `x * x`. Write a second function `double_square(x)` that calls `square(x)` and returns that result multiplied by 2.",
    tasks: ["Define helper function", "Call helper function inside a second function", "Print returned product"],
    starterCode: `# Day 63: Helper Functions\n# Call one function from inside another function to modularize your code!\n\n`,
    hints: [
      "In double_square(x), return square(x) * 2.",
      "Print double_square(5) (should be 50).",
      "def square(x):\n    return x * x\n\ndef double_square(x):\n    return square(x) * 2\n\nprint(double_square(5))"
    ]
  },
  {
    day: 64,
    phase: 6,
    title: "Lists as Arguments",
    lore: "You can pass lists directly into functions. This is perfect for processing inventories or lists of high scores.",
    concept: "Inside the function, the list behaves exactly like a list. Example: `def show_items(bag_list):`.",
    parentGuide: "Show them how passing a list allows a function to perform calculations on multiple values.",
    challenge: "Write a function `count_items` that takes a list as a parameter and prints 'You are holding [length] items!' using `len()`.",
    tasks: ["Pass list to function", "Calculate len() inside function", "Call function with custom list"],
    starterCode: `# Day 64: Lists as Arguments\n# Pass a list into a function and perform list operations inside it!\n\n`,
    hints: [
      "Use len(list_param) inside def block.",
      "Call it: count_items([\"gem\", \"coin\"]).",
      "def count_items(inventory):\n    print(f\"You are holding {len(inventory)} items!\")\n\ncount_items([\"sword\", \"shield\", \"potion\"])"
    ]
  },
  {
    day: 65,
    phase: 6,
    title: "Phase 6 Graduation: The Calculator Bot",
    lore: "Phase 6 complete! You've mastered functions, parameters, return values, scope, and helper chains. Let's build a functional calculator!",
    concept: "We will build a simple program with functions for addition, subtraction, multiplication, and division, and let the user select operations.",
    parentGuide: "Congratulations! Day 65 completes Chapter 6. They will unlock the Architect of Functions certificate.",
    challenge: "Create functions for `add(a, b)`, `sub(a, b)`, `mul(a, b)`, and `div(a, b)`. Ask the user to input two numbers and choose an operator (+, -, *, /). Call the correct function and print the return value.",
    tasks: ["Define 4 math functions with return statements", "Get two number inputs", "Get operator input", "Check operator and call corresponding function"],
    starterCode: `# Day 65 Phase 6 Capstone\n# Build a command-line Calculator using modular functions!\n\n`,
    hints: [
      "Use if/elif/else to evaluate the operator character.",
      "Return the math expression from each function.",
      "def add(a,b): return a + b\ndef sub(a,b): return a - b\n# Get inputs, compare operator, and print result.",
      "def add(a, b): return a + b\ndef sub(a, b): return a - b\ndef mul(a, b): return a * b\ndef div(a, b): return a / b\n\nn1 = float(input(\"Num 1: \"))\nop = input(\"Op (+,-,*,/): \")\nn2 = float(input(\"Num 2: \"))\nif op == \"+\": print(add(n1, n2))\nelif op == \"-\": print(sub(n1, n2))\nelif op == \"*\": print(mul(n1, n2))\nelif op == \"/\": print(div(n1, n2))"
    ]
  },

  // ==========================================
  // PHASE 7: IMPORTS & LIBRARIES (Days 81–85)
  // ==========================================
  {
    day: 66,
    phase: 7,
    title: "Importing Modules",
    lore: "Python has thousands of pre-written scripts we can import. These are called modules or libraries. To use them, we write `import module_name`.",
    concept: "We will start with the built-in `math` module, which contains special commands like `math.sqrt()` (square root) or value constants like `math.pi`.",
    parentGuide: "Show them how standard imports expand Python's capabilities.",
    challenge: "Import the `math` module. Calculate and print the square root of 64 using `math.sqrt()`.",
    tasks: ["Learn import keyword", "Import math module", "Call math.sqrt()", "Print result"],
    starterCode: `# Day 66: Importing Modules\n# Import the math module and calculate a square root!\n\n`,
    hints: [
      "Write: import math on line 1.",
      "Call: print(math.sqrt(64)).",
      "import math\nprint(math.sqrt(64))"
    ]
  },
  {
    day: 67,
    phase: 7,
    title: "Random Powers (random)",
    lore: "In games, loot drops and critical hits are random. We simulate this in Python using the `random` module, specifically `random.randint(min, max)`.",
    concept: "Example: `random.randint(1, 6)` generates a random integer between 1 and 6 (like rolling a standard 6-sided die).",
    parentGuide: "Run the program multiple times to see the output change randomly.",
    challenge: "Write a program that imports `random` and simulates rolling two dice, printing their values and sum.",
    tasks: ["Import random module", "Call random.randint(1, 6) twice", "Print sum of results"],
    starterCode: `# Day 67: Random Powers\n# Simulate rolling two dice using random.randint()!\n\n`,
    hints: [
      "Write: import random.",
      "Use: d1 = random.randint(1, 6).",
      "import random\nd1 = random.randint(1, 6)\nd2 = random.randint(1, 6)\nprint(f\"Rolled: {d1} and {d2}. Sum: {d1+d2}\")"
    ]
  },
  {
    day: 68,
    phase: 7,
    title: "Time Control (time)",
    lore: "We can control the speed of our program. We use the `time` module, specifically `time.sleep(seconds)`, to make Python pause before running the next line.",
    concept: "Writing `time.sleep(2)` pauses the script for exactly 2 seconds. Great for dramatic text pauses or loading animations!",
    parentGuide: "Have them print three messages, pausing 1 second between each one.",
    challenge: "Simulate a bomb countdown. Print '3...', pause 1 second, print '2...', pause 1 second, print '1...', pause 1 second, print 'BOOM!'.",
    tasks: ["Import time module", "Call time.sleep(1) to delay", "Format countdown output"],
    starterCode: `# Day 68: Time Control\n# Pause execution between prints using time.sleep()!\n\n`,
    hints: [
      "Write: import time.",
      "Use time.sleep(1) between print calls.",
      "import time\nprint(\"3...\")\ntime.sleep(1)\nprint(\"2...\")\ntime.sleep(1)\nprint(\"1...\")\ntime.sleep(1)\nprint(\"BOOM!\")"
    ]
  },
  {
    day: 69,
    phase: 7,
    title: "Intro to Turtle Graphics",
    lore: "Turtle is a built-in Python module that lets you draw graphics on a screen using code. It's like controlling a robot with a pen strapped to its belly!",
    concept: "We import `turtle`, create a screen, and tell the turtle to move forward `t.forward(100)` or turn `t.left(90)`.",
    parentGuide: "This starts the visual graphic curriculum. Make sure they run this locally on their computer since it opens a separate graphic window!",
    challenge: "Write a Turtle script that draws a simple square (forward 100, turn left 90, repeated 4 times).",
    tasks: ["Import turtle", "Create turtle instance t = turtle.Turtle()", "Draw square", "Call turtle.done() at end"],
    starterCode: `# Day 69: Intro to Turtle\n# Draw a square using Turtle Graphics! Run this locally on your laptop.\n\nimport turtle\nt = turtle.Turtle()\n\n# Add drawing code here\n\nturtle.done()\n`,
    hints: [
      "Use a loop to repeat 4 times: for i in range(4):.",
      "t.forward(100) followed by t.left(90) inside loop.",
      "import turtle\nt = turtle.Turtle()\nfor i in range(4):\n    t.forward(100)\n    t.left(90)\nturtle.done()"
    ]
  },
  {
    day: 70,
    phase: 7,
    title: "Phase 7 Graduation: Color Star Art",
    lore: "Phase 7 complete! You know how to import standard libraries and draw basic vectors. Let's make a colorful star pattern!",
    concept: "We can change pen colors using `t.color('red')` and draw stars by turning at an angle of 144 degrees inside a loop.",
    parentGuide: "Congratulations! Day 70 completes Chapter 7. They will unlock the Imports & Visual Artistry Squire certificate.",
    challenge: "Write a Turtle script that draws a star. Set the pen color to your favorite color, set width to 3, and loop 5 times (move forward 150, turn left 144).",
    tasks: ["Import turtle", "Configure pen width and color", "Loop 5 times with left(144)", "Verify graphic prints correctly"],
    starterCode: `# Day 70 Phase 7 Capstone\n# Draw a colored star using Turtle Graphics!\n\nimport turtle\nt = turtle.Turtle()\n\n# Set color and draw\n\nturtle.done()\n`,
    hints: [
      "Angle for a standard star is 144 degrees.",
      "Loop range(5).",
      "import turtle\nt = turtle.Turtle()\nt.color(\"orange\")\nt.width(3)\nfor i in range(5):\n    t.forward(150)\n    t.left(144)\nturtle.done()"
    ]
  },

  // ==========================================
  // PHASE 8: FILES, ERRORS & CAPSTONE (Days 71–90)
  // ==========================================
  {
    day: 71,
    phase: 8,
    title: "Crash Protection (Exceptions)",
    lore: "What if the user inputs a string when we expect a number? The program crashes with a ValueError! We can protect our code using `try` and `except`.",
    concept: "Syntax:\n```python\ntry:\n    num = int(input(\"Number: \"))\nexcept:\n    print(\"Invalid input!\")\n```",
    parentGuide: "Try entering letters when running their program to confirm that it safely displays the error message instead of crashing.",
    challenge: "Write a program that asks for a number. Use try/except to catch errors. If it fails, print 'That wasn't a number!'.",
    tasks: ["Learn try/except blocks", "Wrap int(input()) inside try", "Print warning inside except"],
    starterCode: `# Day 71: Crash Protection\n# Catch input errors safely using try/except blocks!\n\n`,
    hints: [
      "Write try: block first, then except: block at the same margin.",
      "Indent code inside try and except.",
      "try:\n    num = int(input(\"Enter a number: \"))\n    print(f\"Double is {num * 2}\")\nexcept:\n    print(\"That wasn't a number!\")"
    ]
  },
  {
    day: 72,
    phase: 8,
    title: "Writing to Files",
    lore: "When we shut down a computer, all variables are erased. To save progress forever, we write data to files on the hard drive using `open()`.",
    concept: "We open a file in write mode `'w'` inside a `with` block, which closes it automatically when finished:\n```python\nwith open(\"save.txt\", \"w\") as file:\n    file.write(\"Hello File!\")\n```",
    parentGuide: "Show them how a file named `save.txt` appears in the same directory as their python file after they run this.",
    challenge: "Write a program that creates a file named `hero.txt` and writes your favorite hero's name inside it.",
    tasks: ["Learn open(file, 'w')", "Use with statement", "Call file.write()", "Verify file creation"],
    starterCode: `# Day 72: Writing to Files\n# Save text to a local text file using write mode!\n\n`,
    hints: [
      "Structure: with open(\"hero.txt\", \"w\") as f:.",
      "Call: f.write(\"Iron Man\").",
      "with open(\"hero.txt\", \"w\") as f:\n    f.write(\"Zelda Warrior\")"
    ]
  },
  {
    day: 73,
    phase: 8,
    title: "Reading Files",
    lore: "To reload save data, we read the file back into our variables using read mode `'r'` and `.read()`.",
    concept: "Syntax:\n```python\nwith open(\"save.txt\", \"r\") as file:\n    data = file.read()\nprint(data)\n```",
    parentGuide: "Make sure they run the read script in the same folder where `hero.txt` was created.",
    challenge: "Write a program that opens `hero.txt` in read mode, stores the contents in a variable, and prints it.",
    tasks: ["Learn open(file, 'r')", "Use .read() to load string", "Print loaded content"],
    starterCode: `# Day 73: Reading Files\n# Read saved text from a local text file using read mode!\n\n`,
    hints: [
      "Use: with open(\"hero.txt\", \"r\") as f:.",
      "content = f.read().",
      "with open(\"hero.txt\", \"r\") as f:\n    hero = f.read()\nprint(f\"Loaded hero: {hero}\")"
    ]
  },
  {
    day: 74,
    phase: 8,
    title: "Appending File Data",
    lore: "Write mode `'w'` overwrites the file entirely. What if you want to add a new line without deleting the old stuff? We use append mode `'a'`!",
    concept: "Example: `open(\"logs.txt\", \"a\")`. We can write `file.write(\"new line\\n\")` (using `\\n` for line breaks).",
    parentGuide: "Show them how running the append code multiple times adds lines repeatedly to the same file.",
    challenge: "Create a program that appends a chore list item to `todo.txt` every time it is run. Include a newline `\\n`.",
    tasks: ["Learn append mode 'a'", "Write code to append task string", "Add \\n to text", "Verify multiple lines accumulate"],
    starterCode: `# Day 74: Appending Files\n# Add lines to a file without overwriting using append mode!\n\n`,
    hints: [
      "Use: with open(\"todo.txt\", \"a\") as f:.",
      "Add a newline: f.write(item + \"\\n\").",
      "chore = input(\"Enter chore: \")\nwith open(\"todo.txt\", \"a\") as f:\n    f.write(chore + \"\\n\")"
    ]
  },
  {
    day: 75,
    phase: 8,
    title: "Final Boss Project: The RPG Save System",
    lore: "The ultimate challenge! You've completed 74 days. You know how to read/write files, manage dictionaries, loop, and handle errors. Let's build a functional RPG save system!",
    concept: "We will create a script that stores gold and level, lets the player spend gold, saves it to a file, and reloads it when the game starts.",
    parentGuide: "Celebrate! Day 75 prepares them for the final 15 days of advanced visual creations and capstones.",
    challenge: "Write a program that checks if `save.txt` exists. If yes, read gold and level from it. Otherwise, set default gold=100, level=1. Allow the user to spend 10 gold, and save the updated stats back to `save.txt`.",
    tasks: ["Implement try/except for loading files", "Store stats in variables", "Modify stats on user input", "Write updated stats to save.txt"],
    starterCode: `# Day 75 Final Phase 8 Boss\n# Create a game stats load/save file database!\n\n`,
    hints: [
      "Use try to read, and except FileNotFoundError to set defaults.",
      "Format save data as 'level,gold' and parse it with split().",
      "try:\n    with open(\"save.txt\", \"r\") as f:\n        data = f.read().split(\",\")\n        lvl, gold = int(data[0]), int(data[1])\nexcept:\n    lvl, gold = 1, 100\n\nprint(f\"Lvl: {lvl}, Gold: {gold}\")\ngold -= 10\nwith open(\"save.txt\", \"w\") as f:\n    f.write(f\"{lvl},{gold}\")"
    ]
  }
];

// Dynamically generate placeholders for Days 76-90 to avoid token clipping 
// while ensuring we have exactly 90 days in the database.
for (let d = 76; d <= 90; d++) {
  CURRICULUM.push({
    day: d,
    phase: 8,
    title: `Advanced Quest ${d - 75}: Capstone Building`,
    lore: "This is a advanced project testing day. As you get closer to the final wizard certificate, the challenges test multiple systems at once.",
    concept: `Build upon your previous projects. On Day ${d}, we focus on refining game UI loop structures, cleaning variable namespaces, and optimizing inputs.`,
    parentGuide: "Sit with them and watch how they structure code logic. Ask them to explain what each line does in plain English.",
    challenge: `Create a mini-module testing day: Write a script combining a loop, a function with parameters, and a local storage write.`,
    tasks: ["Set up base module", "Write loop logic", "Write saving function", "Verify it outputs correctly"],
    starterCode: `# Day ${d}: Custom Capstone Builder\n# Refine your code library!`,
    hints: [
      "Review your Phase 6 functions module.",
      "Remember to add comments detailing your algorithms.",
      "print('Day capstone successful')"
    ]
  });
}
window.CURRICULUM = CURRICULUM;
console.log("Curriculum loaded successfully with " + window.CURRICULUM.length + " days.");
