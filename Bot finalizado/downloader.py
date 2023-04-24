from vimeo_downloader import Vimeo

videos = []
topics = []
videos_and_topics = []

with open('videos.txt', 'r') as file:
  content = file.read()
  videos.append(content.split('\n'))

with open('topics.txt', 'r') as file:
  content = file.read()
  topics.append(content.split('\n'))

for i in range(len(topics)):
  videos_and_topics.append((topics[i], videos[i]))

for i in videos_and_topics:
  v = Vimeo(i)
  stream = v.streams  
      
  for s in stream:
      if s.quality == '720p':
          s.download(download_directory='video', filename=i[1][47:])
          break
      else:  
          print('quality not found')