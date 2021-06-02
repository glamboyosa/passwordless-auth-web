import { submitHandler, loader } from './variables'
export const toggleLoading = (loading) => {
  if (loading) {
    submitHandler.innerText = ''
    loader.style.display = 'inline-block'
  } else {
    submitHandler.innerText = 'Sign Up'
    loader.style.display = 'none'
  }
}
