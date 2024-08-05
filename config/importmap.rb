# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application'
pin '@hotwired/turbo-rails', to: 'turbo.min.js'
pin '@hotwired/stimulus', to: '@hotwired--stimulus.js' # @3.2.2
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js'
pin_all_from 'app/javascript/controllers', under: 'controllers'

pin 'tom-select' # @2.3.1
pin '@stimulus-components/auto-submit', to: '@stimulus-components--auto-submit.js' # @6.0.0

pin 'bootstrap' # @5.3.3
pin '@popperjs/core', to: 'https://unpkg.com/@popperjs/core@2.11.6/dist/esm/index.js'

pin 'firebase/app', to: 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js'
pin 'firebase/firestore', to: 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js'
