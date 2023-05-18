var lecteur;

function lecture() 
{
	var titreVideo = document.getElementById('video-input').value;
	
	if (lecteur) 
		lecteur.destroy();
	
	recherche(titreVideo);
}

function recherche(titre)
{
	var cleApi = 'AIzaSyCcQVLJn5mNB92_k0L8fG5sFomgaTwbTGw';
	var urlApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=' + encodeURIComponent(titre) + '&key=' + cleApi;
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', urlApi, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) 
		{
			var response = JSON.parse(xhr.responseText);
			if (response.items.length > 0) 
			{
				var videoId = response.items[0].id.videoId;
				
				lecteur = new YT.Player('lecteur',
				{
					height: '360',
					width: '630',
					videoId: videoId
				});
				
				var relatedVideos = document.getElementById('related-videos');
				relatedVideos.innerHTML = '';
				
				for (var i = 1; i < response.items.length; i++) {
					var relatedVideoId = response.items[i].id.videoId;
					var thumbnailUrl = response.items[i].snippet.thumbnails.default.url;
					
					var videoElement = document.createElement('div');
					videoElement.innerHTML = '<a href="https://www.youtube.com/watch?v=' + relatedVideoId + '"><img class="file" src="' + thumbnailUrl + '"></a>';
					
					relatedVideos.appendChild(videoElement);
				}
			}
			else
			{
				alert("Aucune vidéo trouvée avec ce titre.");
			}
		}
	};
	
	xhr.send();
}