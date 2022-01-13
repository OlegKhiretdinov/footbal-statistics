import cls from "./Loader.module.css"

const Loader = () => {
  return(
    <div className={cls.lds_dual_ring}></div>
  )
}

export default Loader
