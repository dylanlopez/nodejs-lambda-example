def fnSteps = evaluate readTrusted("jenkinsfiles/steps.groovy")

pipeline {
  agent any
  parameters {
    choice(
      name: 'ENVIRONMENT',
      choices: ['dev', 'pre', 'prod'], 
      description: 'Ambiente a desplegar')
    choice(
      name: 'EXECUTE',
      choices: ['DEFAULT', 'DEPLOY_STACK', 'UPDATE_FUNCTION', 'DELETE_STACK'], 
      description: 'Opciones de deploy/delete del Stack')
  }
  stages {
    stage('Set Config') {
      steps {
        script {
          config = fnSteps.configs(params.ENVIRONMENT)
        }
      }
    }
    stage('Install Dependencies') {
      steps {
        script {
          fnSteps.install_dependencies(config)
        }
      }
    }
    stage('Unit test') {
      steps {
        script {
          fnSteps.unit_test(config)
        }
      }
      post {
        always {
          junit 'app/junit.xml'
        }
      }
    }
    stage('Build Application') {
      steps {
        script {
          fnSteps.build_application(config)
        }
      }
    }
    stage('Deploy stack') {
      when { expression { return params.EXECUTE == 'DEPLOY_STACK' } }
      steps {
        script {
          fnSteps.stack_deploy(config)
        }
      }
    }
    stage('Update function') {
      when { expression { return params.EXECUTE == 'UPDATE_FUNCTION' } }
      steps {
        script {
          fnSteps.update_function(config)
        }
      }
    }
    stage('Delete Stack') {
      when { expression { return params.EXECUTE == 'DELETE_STACK' }}
      steps { 
        script { 
          fnSteps.stack_delete(config)
        } 
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}