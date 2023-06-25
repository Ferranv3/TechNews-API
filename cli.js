const program = require('commander');
const { getTodosFormatted, getTodoById, deleteById, addTodo, createRandomTodos, deleteAll } = require('./app/cliFunctions.js');

program
  .command('show <id>')
  .description('Show single todo')
  .action((id) => {
    getTodoById(id);
  });

program
  .command('add <text>')
  .description('Add new todo')
  .action((text) => {
    addTodo(text);
  });
  
program
  .command('create')
  .description('Add new random todos')
  .action(() => {
    createRandomTodos();
  });

program
  .command('delete <id>')
  .description('Delete todo by id')
  .action((id) => {
    deleteById(id);
  });

program
  .command('purge')
  .description('Delete all todos')
  .action(() => {
    deleteAll();
  });

program
  .command('list')
  .description('List all todos')
  .option('-f, --format <format>', 'Output format', /^(txt|table|json)$/i, 'txt')
  .action(function (options) {
    getTodosFormatted(options.format);
  });


program.parse(process.argv);