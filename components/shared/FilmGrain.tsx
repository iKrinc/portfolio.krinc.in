export function FilmGrain() {
  return (
    <div
      className="film-grain"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.05,
        backgroundImage: 'url(/assets/grain-texture.png)',
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
