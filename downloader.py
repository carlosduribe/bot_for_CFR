from vimeo_downloader import Vimeo

vimeo_url = 'https://player.vimeo.com/video/521556449'
embedded_on = 'https://app.cursofuturosresidentes.com/courses/cirugia-general/lessons/trauma-de-torax/topic/valoracion-y-manejo-del-trauma-de-torax/'

v = Vimeo(vimeo_url, embedded_on)
stream = v.streams  
    
for s in stream:
    if s.quality == '720p':
        s.download(download_directory='video', filename=embedded_on)
        break
    else:  
        print('quality not found')