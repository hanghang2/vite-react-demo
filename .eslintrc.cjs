module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    /**
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn
     * "error" 或 2 - 开启规则，使用错误级别的错误：error
     */
    'rules': {
        'prettier/prettier': 0, // 关闭prettier验证，解决eslint 与prettier冲突配置
        // ---------- Possible Errors 类 ----------
        // 禁用 console
        'no-console': 0,
        // 禁用 debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 定义变量未使用
        'no-unused-vars': 0,
        // 禁止不必要的括号
        'no-extra-parens': [2, 'functions'],
        // ---------- Best Practices ----------
        // 强制 getter 和 setter 在对象中成对出现
        'accessor-pairs': 2,
        // 要求 return 语句要么总是指定返回的值，要么不指定
        'consistent-return': 0,
        // 强制所有控制语句使用一致的括号风格
        curly: [2, 'all'],
        // 要求 switch 语句中有 default 分支，也可添加 // no default 注释取消此次警告
        'default-case': 0,
        // 强制在点号之前和之后一致的换行
        'dot-location': [2, 'property'],
        // 禁用 arguments.caller 或 arguments.callee
        'no-caller': 2,
        // 禁用 eval()
        'no-eval': 2,
        // 禁止数字字面量中使用前导和末尾小数点
        'no-floating-decimal': 2,
        // 禁止使用类似 eval() 的方法
        'no-implied-eval': 2,
        // 禁用 __iterator__ 属性
        'no-iterator': 2,
        // 禁用不必要的嵌套块
        'no-lone-blocks': 2,
        // 禁止使用多个空格
        'no-multi-spaces': 2,
        // 禁止使用多行字符串
        'no-multi-str': 2,
        // 禁止对 String，Number 和 Boolean 使用 new 操作符
        'no-new-wrappers': 2,
        // 禁止在字符串中使用八进制转义序列
        'no-octal-escape': 2,
        // 禁用 __proto__ 属性
        'no-proto': 2,
        // 禁止自身比较
        'no-self-compare': 2,
        // 禁用逗号操作符
        'no-sequences': 2,
        // 禁止抛出异常字面量
        'no-throw-literal': 2,
        // 禁用一成不变的循环条件
        'no-unmodified-loop-condition': 2,
        // 禁止不必要的字符串字面量或模板字面量的连接
        'no-useless-concat': 2,
        // 要求 IIFE 使用括号括起来
        'wrap-iife': [2, 'any'],
        // 禁止 “Yoda” 条件
        yoda: [2, 'never'],
        // ---------- Variables 类 ----------
        // 不允许在变量定义之前使用它们
        'no-use-before-define': 0,
        // ---------- Stylistic Issues 类 ----------
        // 强制数组方括号中使用一致的空格
        'array-bracket-spacing': [2, 'never'],
        // 禁止或强制在代码块中开括号前和闭括号后有空格
        'block-spacing': [2, 'always'],
        // 强制在代码块中使用一致的大括号风格
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true,
            },
        ],
        // 强制使用骆驼拼写法命名约定
        camelcase: [
            0,
            {
                properties: 'always',
            },
        ],
        // 要求或禁止末尾逗号
        'comma-dangle': [2, 'always-multiline'],
        // 强制在逗号前后使用一致的空格
        'comma-spacing': [
            2,
            {
                before: false,
                after: true,
            },
        ],
        // 强制使用一致的逗号风格
        'comma-style': [2, 'last'],
        // 强制在计算的属性的方括号中使用一致的空格
        'computed-property-spacing': [2, 'never'],
        // 要求或禁止文件末尾存在空行
        'eol-last': 2,
        // 要求或禁止在函数标识符和其调用之间有空格
        'func-call-spacing': [2, 'never'],
        // 强制在函数括号内使用一致的换行
        'function-paren-newline': 0,
        // 缩进为4个
        indent: [
            2,
            4,
            {
                SwitchCase: 1,
            },
        ],
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true,
            },
        ],
        // 强制在关键字前后使用一致的空格
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true,
            },
        ],
        // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
        'lines-around-comment': [1, { beforeBlockComment: true }],
        // 强制 function 定义中最多允许的参数数量
        'max-params': [1, 5],
        // 强制对多行注释使用特定风格
        'multiline-comment-style': 0,
        // 要求构造函数首字母大写
        'new-cap': [
            2,
            {
                newIsCap: true,
                capIsNew: false,
            },
        ],
        // 强制或禁止调用无参构造函数时有圆括号
        'new-parens': 2,
        // 禁用 Array 构造函数
        'no-array-constructor': 2,
        // 不允许多个空行
        'no-multiple-empty-lines': [
            2,
            {
                max: 1,
            },
        ],
        // 禁用行尾空格
        'no-trailing-spaces': 2,
        // 禁止属性前有空白
        'no-whitespace-before-property': 2,
        // 强制在花括号中使用一致的空格
        'object-curly-spacing': [2, 'always'],
        // 强制操作符使用一致的换行符
        'operator-linebreak': [2, 'after'],
        // 要求或禁止块内填充
        'padded-blocks': [2, 'never'],
        // 强制使用一致的反勾号、单引号
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        // 要求使用分号而不是 ASI
        semi: [2, 'always', { omitLastInOneLineBlock: true }],
        // 强制分号之前和之后使用一致的空格
        'semi-spacing': [
            2,
            {
                before: false,
                after: true,
            },
        ],
        // 强制在块之前使用一致的空格
        'space-before-blocks': [2, 'always'],
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': [2, 'never'],
        // 强制在圆括号内使用一致的空格
        'space-in-parens': [2, 'never'],
        // 要求操作符周围有空格
        'space-infix-ops': 2,
        // 强制在一元操作符前后使用一致的空格
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false,
            },
        ],
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': [
            2,
            'always',
            {
                markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','],
            },
        ],
        // ---------- ECMAScript 6 类 ----------
        // 箭头函数的空格 箭头前后各一个空格
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true,
            },
        ],
        // 强制 generator 函数中 * 号周围使用一致的空格
        'generator-star-spacing': [
            2,
            {
                before: true,
                after: true,
            },
        ],
        // 禁止重复模块导入
        'no-duplicate-imports': 2,
        // 禁止在对象中使用不必要的计算属性
        'no-useless-computed-key': 2,
        // 禁用不必要的构造函数
        'no-useless-constructor': 2,
        // 要求使用 const 声明那些声明后不再被修改的变量
        'prefer-const': 2,
        // 要求使用模板字面量而非字符串连接
        'prefer-template': 1,
        // 强制剩余和扩展运算符及其表达式之间无空格
        'rest-spread-spacing': [2, 'never'],
        // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        'template-curly-spacing': [2, 'never'],
        // 强制在 yield* 表达式中 * 周围使用空格
        'yield-star-spacing': [2, 'before'],
        // react
        'react/forbid-prop-types': [2, { 'forbid': ['any'] }], // 禁止某些propTypes
        'react/jsx-boolean-value': 2, // 在JSX中强制布尔属性符号
        'react/jsx-closing-bracket-location': 2, // 在JSX中验证右括号位置
        'react/jsx-curly-spacing': [2, { 'when': 'never', 'children': true }], // 在JSX属性和表达式中加强或禁止大括号内的空格。
        'react/jsx-indent-props': [2, 4], // 验证JSX中的props缩进
        'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
        'react/jsx-max-props-per-line': [1, { 'maximum': 3 }], // 限制JSX中单行上的props的最大数量
        'react/jsx-no-bind': 0, // JSX中不允许使用箭头函数和bind
        'react/jsx-no-duplicate-props': 2, // 防止在JSX中重复的props
        'react/jsx-no-literals': 0, // 防止使用未包装的JSX字符串
        'react/jsx-no-undef': 2, // 在JSX中禁止未声明的变量
        'react/jsx-pascal-case': 0, // 为用户定义的JSX组件强制使用PascalCase
        'react/jsx-sort-props': 2, // 强化props按字母排序
        'react/jsx-uses-react': 2, // 防止反应被错误地标记为未使用
        'react/jsx-uses-vars': 2, // 防止在JSX中使用的变量被错误地标记为未使用
        'react/no-danger': 0, // 防止使用危险的JSX属性
        'react/no-did-mount-set-state': 0, // 防止在componentDidMount中使用setState
        'react/no-did-update-set-state': 2, // 防止在componentDidUpdate中使用setState
        'react/no-direct-mutation-state': 2, // 防止this.state的直接变异
        'react/no-multi-comp': 0, // 防止每个文件有多个组件定义
        'react/no-set-state': 0, // 防止使用setState
        'react/no-unknown-property': 2, // 防止使用未知的DOM属性
        'react/prefer-es6-class': 2, // 为React组件强制执行ES5或ES6类
        'react/prop-types': 0, // 防止在React组件定义中丢失props验证
        'react/react-in-jsx-scope': 0, // 使用JSX时防止丢失React
        'react/self-closing-comp': 0, // 防止没有children的组件的额外结束标签
        'react/sort-comp': 2, // 强制组件方法顺序
        'react/jsx-equals-spacing': 2, // 在JSX属性中强制或禁止等号周围的空格
    },
}
