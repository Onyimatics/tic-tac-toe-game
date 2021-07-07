pipeline {
  agent any
  stages {
    stage('Source') {
      steps {
        git(url: 'https://github.com/Onyimatics/tic-tac-toe-game.git', branch: 'develop')
      }
    }

    stage('Build') {
      steps {
        echo 'Building'
      }
    }

    stage('Deploying') {
      steps {
        echo 'Deploying'
      }
    }

  }
}