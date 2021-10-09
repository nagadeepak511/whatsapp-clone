function hideChat(){
    document.getElementsByClassName('chatThumbs')[0].style.display='block'
    document.getElementsByClassName('detailedChat')[0].style.transform = 'translateX(100%)'
}

function showChat(){
    document.getElementsByClassName('detailedChat')[0].style.transform = 'translateX(0)'
    document.getElementsByClassName('chatThumbs')[0].style.display='none'
}