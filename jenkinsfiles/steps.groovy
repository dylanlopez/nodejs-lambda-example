def configs(def enviroment) {
  baseConfig = [
    "ENV=${enviroment}",
    "INFRA_BUCKET=infraestructura.${enviroment}"
  ]

  withEnv(baseConfig) {
    sh 'make env.sync'
  }

  withEnv(baseConfig) {
    sh 'make deploy.sync.params'
  }

  configFile = readYaml file: 'deploy/jenkins.private.yml'

  config = [
    "ENV=${enviroment}",
    "INFRA_BUCKET=infraestructura.${enviroment}",
    "SUBNET_IDS=${configFile.params.SUBNET_IDS}",
    "DEPLOY_REGION=${configFile.params.DEPLOY_REGION}",
    "VPC_ID=${configFile.params.VPC_ID}"
  ]

  return config
}

def install_dependencies(def config) {
  withEnv(config) {
    sh 'make clean'
    sh 'make install'
  }
}

def unit_test(def config) {
  withEnv(config) {
    sh 'make unit.test'
  }
}

def build_application(def config) {
  withEnv(config) {
    sh 'make build'
    sh 'make create.zip'
  }
}

def stack_deploy(def config) {
  withEnv(config) {
    sh 'make upload.function'
    sh 'make stack.deploy'
  }
}

def update_function(def config) {
  withEnv(config) {
    sh 'make upload.function'
    sh 'make update.function'
  }
}

def stack_delete(def config) {
  withEnv(config) {
    sh 'make stack.delete'
  }
}

return this