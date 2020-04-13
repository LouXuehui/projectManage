// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/approval', component: '../pages/approval/index' },
        { path: '/survey', component: '../pages/survey/index' }
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'projectManage',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
