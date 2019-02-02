import surahs from "../api/surahs";

export const getNextAyah = (surah: number, ayah: number) => {
  const nextAyah = ayah + 1;
  if (surahs[surah].ayah == nextAyah - 1) {
    if (surah === 114 && ayah === 6) {
      return {
        nextSurah: 1,
        nextAyah: 1,
      }
    } else {
      const nextSurah = Number(surah) + 1;
      return {
        nextSurah,
        nextAyah: 1,
      }
    }
  }
  else {
    return {
      nextSurah: surah,
      nextAyah,
    }
  }
}

export const getPrevAyah = (surah: number, ayah: number) => {
  const prevAyah = ayah - 1;
  if (ayah == 1) {
    if (surah == 1) {
      return {
        prevSurah: 114,
        prevAyah: surahs[114].ayah,
      }
    } else {
      const prevSurah = surah - 1;
      return {
        prevSurah,
        prevAyah: surahs[prevSurah].ayah,
      }
    }
  }
  else {
    return {
      prevSurah: surah,
      prevAyah,
    }
  }
}
