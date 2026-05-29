# Schéma relationnel

**Musique** (**IdMusique**, NomMusique, DureeMusique, PrixMusique, _#IdAlbum_);

**Album** (**IdAlbum**, NomAlbum, DateSortieAlbum, _#IdArtiste_);

**Artiste** (**IdArtiste**, NomArtiste);

**StyleMusique** (NomStyle);

**Playlist** (**IdPlaylist**, NomPlaylist, _#IdUtilisateur_);

**Utilisateur** (IdUtilisateur, PrenomUtilisateur, NomUtilisateur, EmailUtilisateur, DateInscriptionUtilisateur);

**AComme** (_**#IdMusique**_, _**#NomStyle**_);

**Contient** (_**#IdMusique**_, _**#IdPlaylist**_);

**Achète** (_**#IdUtilisateur**_, _**#IdMusique**_, DateAchat);
