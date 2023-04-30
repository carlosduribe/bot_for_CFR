from vimeo_downloader import Vimeo

videos = []
topics = []

with open('./Ginecología y Obstetricia/videos.txt', 'r') as file:
  videos = file.read().split('\n')

with open('./Ginecología y Obstetricia/topics.txt', 'r') as file:
  topics = file.read().split('\n')

for i in range(len(videos)):
  v = Vimeo(videos[i], topics[i])
  stream = v.streams  
    
  for s in stream:
    if s.quality == '720p':
      name = str(topics[i][47:].replace('-', ' ').replace('/', '-'))
      s.download(download_directory='./Ginecología y Obstetricia', filename=name)
      break
    else:  
      print('quality not found')