import { Controller } from "@hotwired/stimulus";
import { Modal } from "bootstrap";
import { fetchComments, createComment } from "../firebase";

const ERROR_MESSAGE = '<div class="text-center text-danger">Error loading comments</div>'
const NO_COMMENTS_MESSAGE = '<div class="text-center">No comments yet</div>'

export default class extends Controller {
  static targets = ["modal", "spinner", "commentTemplate", "comments", "movieTitle", "createCommentText"];

  connect() {
    this.modal = null
    this.comments = []
    this.movieId = null
    this.movieTitle = ''
  }

  show(event) {
    event.preventDefault();

    const element = event.currentTarget

    this.movieId = +element.dataset.movieId
    this.movieTitle = element.dataset.title

    this.resetModal()
    this.loadComments()

    this.modal = new Modal(this.modalTarget);

    this.modal.show();
  }

  createComment(event) {
    event.preventDefault();
    const message = this.createCommentTextTarget.value

    this.resetModal()
    createComment({
      movieId: this.movieId,
      message
    }).then(() => {
      this.loadComments()
    }).catch((error) => {
      this.commentsTarget.innerHTML = ERROR_MESSAGE
    })
  }

  resetModal() {
    this.spinnerTarget.classList.remove('d-none')
    this.movieTitleTarget.innerHTML = `${this.movieTitle} Comments`
    this.commentsTarget.innerHTML = ''
    this.createCommentTextTarget.value = ''
  }

  loadComments() {
    fetchComments({ movieId: this.movieId }).then((comments) => {
      this.spinnerTarget.classList.add('d-none')

      if (!Array.isArray(comments)) {
        this.commentsTarget.innerHTML = ERROR_MESSAGE
        return
      }

      if (comments.length === 0) {
        this.commentsTarget.innerHTML = NO_COMMENTS_MESSAGE
        return
      }

      this.comments = [...comments].sort(function (x, y) {
        return x.date.seconds - y.date.seconds;
      })

      this.commentsTarget.innerHTML = ''

      this.comments.forEach((comment) => {
        this.addComment(comment)
      })
    }).catch((error) => {
      this.commentsTarget.innerHTML = ERROR_MESSAGE
    })
  }

  addComment(comment) {
    const commentTemplate = `
      <div class="comment">
        <div>
          ${comment.name}:
        </div>
        <div class="d-flex flex-row">
          <div class="comment__avatar rounded-circle p-3 bg-primary ">
          </div>
          <div class="comment__text bg-primary text-light flex-grow-1 ms-2 p-1">
            ${comment.message}
          </div>
        </div>
      </div>
    `
    this.commentsTarget.insertAdjacentHTML('beforeend', commentTemplate)
  }
}
