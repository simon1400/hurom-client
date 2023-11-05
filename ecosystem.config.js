module.exports = {
  apps : [{
    name   : "Hurom client",
    watch: true,
    ignore_watch : ["node_modules", "client/img", "\\.git", "*.log"],
    script : "yarn start",
    env_production: {}
  }],

  deploy : {
    production : {
      user : 'dimi',
      host : ['89.221.216.23'],
      ref  : 'origin/main',
      repo : 'git@github.com:simon1400/hurom-client.git',
      path : '/var/www/hurom/client',
      'post-deploy' : 'yarn && yarn build && pm2 reload ecosystem.config.js --env production',
    }
  }
};
