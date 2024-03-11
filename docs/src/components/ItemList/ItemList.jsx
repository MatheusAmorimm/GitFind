import "./style.css"

export default function ItemList( {title, description, page}) {
  return (
    <div className="itemList">
      <strong>{title}</strong>
      <p>{description}</p>
      <a href = {page} target="blank">Ver o código</a>
      <hr/>
    </div>
  )
}
