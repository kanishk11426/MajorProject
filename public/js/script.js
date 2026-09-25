(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')

      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.setAttribute('aria-invalid', String(!field.checkValidity()))
      })
    }, false)
  })
})()
