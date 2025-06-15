export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "green" : "aliceblue",
  }
  return (
    <button style={styles} onClick={props.hold} className="Dicebtn">
      {props.num}
    </button>
  )
}
