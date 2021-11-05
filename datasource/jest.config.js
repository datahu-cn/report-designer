const path = require('path')
const {pathsToModuleNameMapper} = require('ts-jest/utils')
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const {compilerOptions} = require('./tsconfig')

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  moduleDirectories: ['node_modules', 'src', '../core/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  // 测试文件
  testMatch: [
    // '<rootDir>/tests/*.spec.ts?(x)',
    // '<rootDir>/tests/sqlserver/SqlServerDataSource.spec.ts?(x)',
    // '<rootDir>/tests/mysql/MysqlDataSource.spec.ts?(x)',
    // '<rootDir>/tests/excel/ExcelDataSource.spec.ts?(x)'
    // '<rootDir>/tests/restful/RestfulDataSource.spec.ts?(x)',
    // '<rootDir>/tests/postgresql/*.spec.ts?(x)',
    '<rootDir>/tests/domino/DominoDataSource.spec.ts?(x)'
  ],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.(t|j)sx?$': 'ts-jest'
  }
}
