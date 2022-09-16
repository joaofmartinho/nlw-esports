import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { THEME } from '../../theme';
import { Entypo } from '@expo/vector-icons';
import logoImage from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { GameCardProps } from '../../components/GameCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState<boolean>(false);
  const [discordUsername, setDiscordUsername] = useState<string>('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDiscordUsername = async (adsId: string) => {
    fetch(`https://nlw-esports.fly.dev/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        setDiscordUsername(data.ad.discord);
        setIsDiscordModalOpen(true);
      });
  };

  useEffect(() => {
    fetch(`https://nlw-esports.fly.dev/games/${game.id}/ad`)
      .then((response) => response.json())
      .then((data) => {
        setDuos(data);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleGoBack()}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            ></Entypo>
          </TouchableOpacity>

          <Image source={logoImage} style={styles.logo}></Image>
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        ></Image>

        <Heading
          title={game.title}
          subtitle={'Conecta-te e começa a jogar!'}
        ></Heading>

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {
                getDiscordUsername(item.id);
              }}
            ></DuoCard>
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Ainda não há Duos para este jogo
            </Text>
          )}
        ></FlatList>

        <DuoMatch
          visible={isDiscordModalOpen}
          discord={discordUsername}
          onClose={() => setIsDiscordModalOpen(false)}
        ></DuoMatch>
      </SafeAreaView>
    </Background>
  );
}
