function GalleryImages(){
  const gallery =document.querySelector('.gallery');
  const images = gallery.querySelectorAll('img');

  images.forEach(el =>{
    let title = el.alt;
    const clone_img = el.cloneNode();

    
    const img_cont =document.createElement('div');
    img_cont.classList.add('gallery-imgs-cont');
    img_cont.append(clone_img);




    const modal_window = new ModalWindow({title, html:img_cont})
    el.onclick =modal_window.open;
  })
}
GalleryImages();


