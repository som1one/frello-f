module.exports = {
  apps: [
    {
      name: "f-frello",
      cwd: "/var/www/worker/f-frello",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_SERVER_URL: "https://frello.ru/api"
      }
    }
  ]
};

