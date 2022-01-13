import cls from "./Loader.module.scss"

const Loader = () => {
  return(
    <div className={cls.lds_dual_ring}></div>
  )
}

export default Loader
