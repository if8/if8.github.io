let captureScrollQueue = []

window.addEventListener(
  'scroll',
  function(e) {
    for (let i = 0; i < captureScrollQueue.length; i++) {
      captureScrollQueue[i](e)
    }
  },
  true,
)

export function addCaptureScroll(f) {
  if (!captureScrollQueue.includes(f)) {
    captureScrollQueue.push(f)
  }
  return function remove() {
    removeCaptureScroll(f)
  }
}

export function removeCaptureScroll(f) {
  captureScrollQueue = captureScrollQueue.filter(item => item !== f)
}
