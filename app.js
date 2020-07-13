require('env2')('./.env');
// APP 入口的 JS
const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');
const plugins = require('./plugins');

const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection({
    port: config.port,
    host: config.host,
});

const init = async () => {
    await server.register([
        // 为系统使用 hapi-swagger
        ...plugins.pluginHapiSwagger,
        plugins.pluginHapiPagination,
        plugins.hapiAuthJWT2
    ]);
    server.route([
        // 创建一个简单的hello hapi接口
        ...routes.helloTestRoutes,
        ...routes.orderRoutes,
        ...routes.shopRoutes,
        ...routes.usersRoutes

    ]);
    // 启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
