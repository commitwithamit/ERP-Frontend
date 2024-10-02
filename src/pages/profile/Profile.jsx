import PersonalDetails from "./PersonalDetails"
import ExtraDetails from "./ExtraDetails"


export default function Profile() {

  return (
    <section className="profile-container flex gap-6 h-max">
      <PersonalDetails/>

      <ExtraDetails/>

      
    </section>
  )
}
