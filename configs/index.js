/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:31. *
 ***************************************************/
const Config = require("webpack-chain");
const config = new Config();

require("./config.base")(config);
require("./config.css")(config);
require("./config.resources")(config);
require("./config.script")(config);
require("./config.dev.server")(config);
require("./config.plugins")(config);
require("./config.optimization")(config);


module.exports = config;
