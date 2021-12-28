<template lang="html">
    <div>
        <p align=center>
            <img :src=imageSrc />
        </p>
    </div>
</template>

<script>
export default {
    props: {
        imageSrc: String
    }
}
</script>