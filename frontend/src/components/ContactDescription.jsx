import { contactIntroduction } from '../content'

export default function ContactDescription() {
  return <>
    <p>{contactIntroduction.opening}<strong>{contactIntroduction.fields}</strong>{contactIntroduction.experience}</p>
    <p className="contact-call-to-action"><strong>{contactIntroduction.callToAction}</strong></p>
  </>
}
