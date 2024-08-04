// Import and register all your controllers from the importmap under controllers/*

import { application } from "controllers/application"
import AutoSubmit from '@stimulus-components/auto-submit'
import ModalController from "controllers/modal_controller"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

application.register('auto-submit', AutoSubmit)
application.register("modal", ModalController)
