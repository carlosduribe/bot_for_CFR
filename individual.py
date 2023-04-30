from vimeo_downloader import Vimeo

vimeo_url = 'https://player.vimeo.com/video/761969553'
embedded_on = 'https://app.cursofuturosresidentes.com/courses/urgencias-anestesiologia-y-toxicologia/lessons/emergencias-oncologicas/topic/compresion-medular/'

v = Vimeo(vimeo_url, embedded_on)
stream = v.streams  
    
for s in stream:
    if s.quality == '720p':
        name = str(embedded_on[47:].replace('-', ' ').replace('/', '-'))
        print (name)
        s.download(download_directory='./Medicina interna', filename=name)
        break
    else:  
        print('quality not found')