import React, { useState } from 'react';
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopyingToClipboard, setIsCopyingToClipboard] =
    useState<boolean>(false);

  const handleCopyDiscordUserToClipboard = async () => {
    setIsCopyingToClipboard(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert(
      'Discord copiado!',
      'para colares no discord e encontrares este Duo!',
    );

    setIsCopyingToClipboard(false);
  };

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            ></MaterialIcons>
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight='bold'
          ></CheckCircle>

          <Heading
            title="Let's play!"
            subtitle='Agora é só começar a jogar!'
            style={{ alignItems: 'center', marginTop: 24 }}
          ></Heading>
          <Text style={styles.label}>Adicione no discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordUserToClipboard}
            disabled={isCopyingToClipboard}
          >
            <Text style={styles.discord}>
              {isCopyingToClipboard ? (
                <ActivityIndicator
                  color={THEME.COLORS.PRIMARY}
                ></ActivityIndicator>
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
