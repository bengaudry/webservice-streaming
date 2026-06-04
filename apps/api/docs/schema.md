# Schéma relationnel

**Musiques** (**IdMusique**, NomMusique, DureeMusique, PrixMusique, _#IdAlbum_);

**Albums** (**IdAlbum**, NomAlbum, DateSortieAlbum, _#IdArtiste_);

**Artistes** (**IdArtiste**, NomArtiste);

**StylesMusique** (**IdStyle**, NomStyle);

**Playlists** (**IdPlaylist**, NomPlaylist, _#IdUtilisateur_);

**Utilisateur** (**IdUtilisateur**, PrenomUtilisateur, NomUtilisateur, EmailUtilisateur, DateInscriptionUtilisateur);

**StylesAssociesMusique** (_**#IdMusique**_, _**#IdStyle**_);

**ContenuPlaylists** (_**#IdMusique**_, _**#IdPlaylist**_);

**AchatsUtilisateur** (_**#IdUtilisateur**_, _**#IdMusique**_, DateAchat);
